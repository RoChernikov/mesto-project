// ------------------------------------------------------------styles
import './index.css';
// ---------------------------------------------------------------api
import Api from '../components/API';
// ----------------------------------------------------------validate
import FormValidator from '../components/FormValidator';
// -----------------------------------------------------------section
import Section from '../components/Section';
// --------------------------------------------------------------card
import Card from '../components/Card';
// ----------------------------------------------------------userinfo
import UserInfo from '../components/UserInfo';
// -------------------------------------------------------------modal
import PopupWithImage from '../components/PopupWithImage';

import PopupWithForm from '../components/PopupWithForm';

import PopupWithConfirm from '../components/PopupWithConfirm';
// ---------------------------------------------------------variables
import {
  validSettings,
  fetchParams,
  profileName,
  profileAbout,
  profileAvatar,
  userNameSelector,
  userCaptionSelector,
  userAvatarSelector,
  avatarSpinner,
  popupEditInputName,
  popupEditInputAbout,
  popupEditSelector,
  popupList,
  popupAvatarSelector,
  popupAddSelector,
  popupImageSelector,
  popupConfirmSelector,
  containerSelector,
  cardTemplateSelector,
  avatarErrorClass
} from '../utils/variables.js';

export const api = new Api(fetchParams);

let currentUserId = null;
let currentCard = null;

//Заполняет форму попапа редактирования профиля
const renderProfileForm = () => {
  popupEditInputName.value = profileName.textContent;
  popupEditInputAbout.value = profileAbout.textContent;
};

// ******************************************Попап с подтверждением удаления******************************************
const popupWithConfirm = new PopupWithConfirm(popupConfirmSelector, {
  submit: id => {
    api
      .deleteCard(id)
      .then(() => currentCard.deleteCard())
      .then(() => {
        currentCard = null;
        popupWithConfirm.close();
      })
      .catch(err => {
        console.log(err);
      });
  }
});

//Создает карточку
const createNewCard = data => {
  const card = new Card(data, currentUserId, cardTemplateSelector, {
    handleCardClick: data => popupImage.open(data),
    handleCardDelete: () => {
      currentCard = card;
      popupWithConfirm.open(data._id);
    }
  });
  return card;
};

//  отрисовка карточек
const cards = new Section(
  {
    renderer: data => {
      const card = createNewCard(data);
      const cardElement = card.generateCard();
      cards.addItem(cardElement, 'append');
    }
  },
  containerSelector
);

// Лоадер аватара
import ImageLoader from '../components/ImageLoader';

const avatarImageLoader = new ImageLoader(
  profileAvatar,
  avatarSpinner,
  avatarErrorClass
);

//---+++++Загрузка данных+++++---
api
  .loadData()
  .then(data => {
    const [userData, cardsData] = data;
    currentUserId = userData._id;
    userInfo.setUserInfo(userData);
    profileAvatar.setAttribute('src', `${userData.avatar}`);
    avatarImageLoader.initialize();
    cards.renderItems(cardsData);
  })
  .catch(err => console.log(err));

const userInfo = new UserInfo({
  userNameSelector,
  userCaptionSelector,
  userAvatarSelector
});

// ******************************************Работа с попамапи******************************************

// ******************************************Попап увеличенной фотографии******************************************
const popupImage = new PopupWithImage(popupImageSelector);

// ******************************************Попап редактирования профиля******************************************
const editInfoFormSubmitCallback = data => {
  popupWithEditInfoForm.setBtnStatusSaving(true);
  api
    .setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo(res);
      popupWithEditInfoForm.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupWithEditInfoForm.setBtnStatusSaving(false);
    });
};

const popupWithEditInfoForm = new PopupWithForm(
  popupEditSelector,
  editInfoFormSubmitCallback
);

// ******************************************Попап добавления новой карточки******************************************
const addNewCardFormSubmitCallback = data => {
  popupWithAddNewCardForm.setBtnStatusSaving(true);
  api
    .postCard(data)
    .then(res => {
      const card = createNewCard(res); //это дубль секшн, как его тут переиспользовать?
      const cardElement = card.generateCard();
      cards.addItem(cardElement, 'append');
      //todo заблокировать кнопку
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupWithAddNewCardForm.setBtnStatusSaving(false);
      popupWithAddNewCardForm.close();
    });
};

const popupWithAddNewCardForm = new PopupWithForm(
  popupAddSelector,
  addNewCardFormSubmitCallback
);

// ******************************************Попап редактирования аватара******************************************
const avatarEditFormSubmitCallback = data => {
  popupWithAvatarEditForm.setBtnStatusSaving(true);
  avatarImageLoader.initialize();
  api
    .setAvatar(data)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
      //todo заблокировать кнопку, при повторном открытии она активна
      popupWithAvatarEditForm.close();
    })
    .catch(err => {
      console.log('ошибка установки аватара', err);
    })
    .finally(() => {
      popupWithAvatarEditForm.setBtnStatusSaving(false);
    });
};
const popupWithAvatarEditForm = new PopupWithForm(
  popupAvatarSelector,
  avatarEditFormSubmitCallback
);

// ******************************************Слушатели на открытие попапов******************************************
document.querySelector('.page-btn_type_edit').addEventListener('click', () => {
  renderProfileForm(); //todo предзаполнение в форме полей. оставить тут или добавить в класс?
  popupWithEditInfoForm.open();
});

document.querySelector('.page-btn_type_add').addEventListener('click', () => {
  popupWithAddNewCardForm.open();
});

document
  .querySelector('.profile__avatar-container')
  .addEventListener('click', () => {
    popupWithAvatarEditForm.open();
  });
// ******************************************Валидация******************************************
const setValidation = formElement => {
  const popupValidator = new FormValidator(validSettings, formElement);
  popupValidator.enableValidation();
};

popupList.forEach(popup => {
  setValidation(popup);
});

// ******************************************ЭТА ФУНКЦИЯ УБИРАЕТ БАГ!******************************************
// **________________________________________________________________________________________________________**
// **       При загрузке страницы на мгновение видны скрытые модальные окна. Баг возникает рандомно.         **
// **    Так происходит из-за того, что окна скрыты с помощью комбинации CSS свойств visability              **
// **    и opacity вместо свойства display для реализации анимации при открытии/закрытии, так как            **
// **    свойство display не анимируется. Изменение этого свойства добавлением класса ломает анимацию.       **
// **       Для решения этой проблемы, всем модальным окнам изначально применено свойство display: none;,    **
// **    данная функция ассинхронно меняет это свойство, что позволяет избежать бага.                        **
// **       Лучше способа не придумал, баг не критиный, но мне не нравится. Если есть идеи,                  **
// **    как решить это лучше - поделитесь, буду признателен!                                                **
// **________________________________________________________________________________________________________**
const makePopupsVisible = popupList =>
  popupList.forEach(popup => (popup.style.display = 'flex'));
setTimeout(() => makePopupsVisible(popupList), 100);
// ************************************************************************************************************
