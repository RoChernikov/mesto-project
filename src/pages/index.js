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
// -------------------------------------------------------imageloader
import ImageLoader from '../components/ImageLoader';
// -------------------------------------------------------------modal
import PopupWithImage from '../components/PopupWithImage';

import PopupWithForm from '../components/PopupWithForm';

import PopupWithConfirm from '../components/PopupWithConfirm';
// ---------------------------------------------------------variables
import {
  validSettings,
  fetchParams,
  profileAvatar,
  userNameSelector,
  userCaptionSelector,
  userAvatarSelector,
  avatarSpinner,
  popupEditInputName,
  popupEditInputAbout,
  popupEditProfileSelector,
  popupList,
  popupAvatarSelector,
  popupAddSelector,
  popupImageSelector,
  popupConfirmSelector,
  containerSelector,
  cardTemplateSelector,
  avatarErrorClass,
  cardImageErrorClass,
  addCardBtn,
  editProfileBtn,
  avatarEditBtn
} from '../utils/variables.js';

let currentUserId = null;
let currentCard = null;

const api = new Api(fetchParams);

const avatarImageLoader = new ImageLoader(
  profileAvatar,
  avatarSpinner,
  avatarErrorClass
);

// --------------------заполняет форму попапа редактирования профиля

const renderProfileForm = () => {
  const userData = userInfo.getUserInfo();
  popupEditInputName.value = userData.name;
  popupEditInputAbout.value = userData.about;
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

function handleLikeClick(card, data) {
  const promise = card.isLiked()
    ? api.dislikeCard(data._id)
    : api.likeCard(data._id);
  promise
    .then(data => {
      card.setLike(data);
    })
    .catch(err => {
      console.log(`${err}`);
    });
}

function cardImageloader(card, errorClass) {
  const imageLoader = new ImageLoader(
    card._cardImage,
    card._spinner,
    errorClass
  );
  imageLoader.initialize();
}

// -----------------------------------------создание новой карточки

const createNewCard = data => {
  const card = new Card(data, currentUserId, cardTemplateSelector, {
    handleCardClick: data => popupImage.open(data),
    handleCardDelete: () => {
      currentCard = card;
      popupWithConfirm.open(data._id);
    },
    handleLikeClick: () => handleLikeClick(card, data),
    cardImageloader: () => cardImageloader(card, cardImageErrorClass)
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

// ---------------------------------------загрузка данных с сервера

api
  .loadData()
  .then(data => {
    const [userData, cardsData] = data;
    currentUserId = userData._id;
    userInfo.setUserInfo(userData);
    avatarImageLoader.initialize();
    cards.renderItems(cardsData);
  })
  .catch(err => console.log(err));

const userInfo = new UserInfo({
  userNameSelector,
  userCaptionSelector,
  userAvatarSelector
});

// ---------------------функционал попапа с увеличением фотографии

const popupImage = new PopupWithImage(popupImageSelector);

// ---------------------функционал попапа с редактирования профиля

const editProfileSubmitCallback = data => {
  popupWithEditProfile.setBtnStatusSaving(true);
  api
    .setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo(res);
      popupWithEditProfile.close();
    })
    .catch(err => {
      console.log('Ошибка редактирования профиля', err);
    })
    .finally(() => {
      popupWithEditProfile.setBtnStatusSaving(false);
    });
};

const popupWithEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  editProfileSubmitCallback
);

// ------------------функционал попапа добавления новой карточки

const addCardSubmitCallback = data => {
  popupWithAddCard.setBtnStatusSaving(true);
  api
    .postCard(data)
    .then(res => {
      const card = createNewCard(res);
      const cardElement = card.generateCard();
      cards.addItem(cardElement, 'append');
      popupWithAddCard.close();
    })
    .catch(err => {
      console.log('Ошибка добавления карточки', err);
    })
    .finally(() => {
      popupWithAddCard.setBtnStatusSaving(false);
    });
};

const popupWithAddCard = new PopupWithForm(
  popupAddSelector,
  addCardSubmitCallback
);

// ------------------функционал попапа с редактирования аватара

const avatarEditSubmitCallback = data => {
  popupWithAvatarEdit.setBtnStatusSaving(true);
  avatarImageLoader.initialize();
  api
    .setAvatar(data)
    .then(res => {
      profileAvatar.src = res.avatar;
      popupWithAvatarEdit.close();
    })
    .catch(err => {
      console.log('Ошибка установки аватара', err);
    })
    .finally(() => {
      popupWithAvatarEdit.setBtnStatusSaving(false);
    });
};
const popupWithAvatarEdit = new PopupWithForm(
  popupAvatarSelector,
  avatarEditSubmitCallback
);

// -----------наложение слушателей на кнопки открытия попапов

editProfileBtn.addEventListener('click', () => {
  renderProfileForm();
  popupWithEditProfile.open();
});

addCardBtn.addEventListener('click', () => {
  popupWithAddCard.open();
});

avatarEditBtn.addEventListener('click', () => {
  popupWithAvatarEdit.open();
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
