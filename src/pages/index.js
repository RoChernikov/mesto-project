// ------------------------------------------------------------styles
import './index.css';
// ---------------------------------------------------------------api
import Api from '../components/API';
// ----------------------------------------------------------validate
import FormValidator from '../components/FormValidator';
// -----------------------------------------------------------section
import Section from '../components/Section';
// --------------------------------------------------------------card
import Card from '../components/Сard';
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
  avatarEditSelector,
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
  avatarErrorClass,
  addNewCardBtnSelector,
  userEditBtnSelector
} from '../utils/variables.js';

// ----------------------------------------------------avatar loader

import ImageLoader from '../components/ImageLoader';

export const api = new Api(fetchParams);

let currentUserId = null;
let currentCard = null;

// --------------------заполняет форму попапа редактирования профиля

const renderProfileForm = () => {
  popupEditInputName.value = profileName.textContent;
  popupEditInputAbout.value = profileAbout.textContent;
};

// ----------------------функционал попапп с подтверждением удаления

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

// -----------------------------------------создание новой карточки

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

// ----------------------------------------------отрисовка карточек

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

const avatarImageLoader = new ImageLoader(
  profileAvatar,
  avatarSpinner,
  avatarErrorClass
);

// ---------------------------------------загрузка данных с сервера

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

// ---------------------функционал попапа с уведичением фотографии

const popupImage = new PopupWithImage(popupImageSelector);

// ---------------------функционал попапа с редактирования профиля

const editInfoFormSubmitCallback = data => {
  popupWithEditInfoForm.setBtnStatusSaving(true);
  api
    .setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo(res);
      popupWithEditInfoForm.close();
    })
    .catch(err => {
      console.log('Ошибка редактирования профиля', err);
    })
    .finally(() => {
      popupWithEditInfoForm.setBtnStatusSaving(false);
    });
};

const popupWithEditInfoForm = new PopupWithForm(
  popupEditSelector,
  editInfoFormSubmitCallback
);

// ------------------функционал попапа добавления новой карточки

const addNewCardFormSubmitCallback = data => {
  popupWithAddNewCardForm.setBtnStatusSaving(true);
  api
    .postCard(data)
    .then(res => {
      const card = createNewCard(res); 
      const cardElement = card.generateCard();
      cards.addItem(cardElement, 'append');
    })
    .catch(err => {
      console.log('Ошибка добавления карточки', err);
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

// ------------------функционал попапа с редактирования аватара

const avatarEditFormSubmitCallback = data => {
  popupWithAvatarEditForm.setBtnStatusSaving(true);
  avatarImageLoader.initialize();
  api
    .setAvatar(data)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);      
      popupWithAvatarEditForm.close();
    })
    .catch(err => {
      console.log('Ошибка установки аватара', err);
    })
    .finally(() => {
      popupWithAvatarEditForm.setBtnStatusSaving(false);
    });
};
const popupWithAvatarEditForm = new PopupWithForm(
  popupAvatarSelector,
  avatarEditFormSubmitCallback
);

// -----------наложение слушателей на кнопки открытия попапов

document
  .querySelector(userEditBtnSelector)
  .addEventListener('click', () => {
    renderProfileForm(); 
    popupWithEditInfoForm.open();
});

document
  .querySelector(addNewCardBtnSelector)
  .addEventListener('click', () => {
    popupWithAddNewCardForm.open();
});

document
  .querySelector(avatarEditSelector)
  .addEventListener('click', () => {
    popupWithAvatarEditForm.open();
  });

// -----------------------------------инициализация валидации

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
