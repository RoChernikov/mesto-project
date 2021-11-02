// ------------------------------------------------styles
import './index.css';

// ----------------------------------------------validate
import FormValidator from '../components/FormValidator';

// -------------------------------------------------utils
import {
  generateCards,
  disableButton,
  // handleImageLoaderState,
  setBtnLabel
} from '../components/utils';

// -------------------------------------------------utils
import Section from '../components/Section';

// --------------------------------------------------card
import Card from '../components/Card';

// -------------------------------------------------modal

import PopupWithImage from '../components/PopupWithImage';

import PopupWithForm from '../components/PopupWithForm';

import PopupWithConfirm from '../components/PopupWithConfirm';

import Api from '../components/API';

import UserInfo from '../components/UserInfo';

//---+++++Глобальные переменные+++++---
//параметры запросов
const fetchParams = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2/',
  headers: {
    'authorization': '97ccf1bd-d259-459d-8352-7ffe6d750b35',
    'Content-Type': 'application/json'
  }
};
export const api = new Api(fetchParams);
//профиль
export let currentUserId = null;
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileAvatar = profile.querySelector('.profile__avatar');
const avatarSpinner = profile.querySelector('.profile__spinner');
//Pop-Up редактирования профиля
const popupEdit = document.querySelector('.popup-edit');
const popupEditInputName = popupEdit.querySelector('.form__input_type_name');
const popupEditInputAbout = popupEdit.querySelector('.form__input_type_about');
const popupEditForm = popupEdit.querySelector('.form');
const popupEditBtn = popupEdit.querySelector('.form__submit');
//Pop-Up редактирования аватара
const popupAvatar = document.querySelector('.popup-avatar');
const popupAvatarForm = popupAvatar.querySelector('.form');
const popupAvatarInput = document.querySelector(
  '.form__input_type_avatar-link'
);
const popupAvatarBtn = popupAvatar.querySelector('.form__submit');
const popupAdd = document.querySelector('.popup-add');
const popupAddForm = popupAdd.querySelector('.form');
const popupAddBtn = popupAdd.querySelector('.form__submit');
const popupAddInputImgTitle = popupAdd.querySelector(
  '.form__input_type_img-title'
);
const popupAddInputImgLink = popupAdd.querySelector(
  '.form__input_type_img-link'
);
const popupList = Array.from(document.querySelectorAll('.popup'));

// Параметры валидации
const validSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
};

//Заполняет форму попапа редактирования профиля
const renderProfileForm = () => {
  popupEditInputName.value = profileName.textContent;
  popupEditInputAbout.value = profileAbout.textContent;
};

//Создает карточку
const handleCardClick = data => popupImage.open(data);

const createNewCard = data => {
  const card = new Card(data, currentUserId, '#card-template', handleCardClick);
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
  '.cards__list'
);

//---+++++Загрузка данных+++++---
api
  .loadData()
  .then(data => {
    const [userData, cardsData] = data;
    currentUserId = userData._id;
    userInfo.setUserInfo(userData);
    profileAvatar.setAttribute('src', `${userData.avatar}`);
    cards.renderItems(cardsData);
  })
  .catch(err => console.log(err));

const userNameSelector = '.profile__name';
const userCaptionSelector = '.profile__about';
const userAvatarSelector = '.profile__avatar';

const userInfo = new UserInfo({
  userNameSelector,
  userCaptionSelector,
  userAvatarSelector
});

/*
//Функцианал редактирования профиля
popupEditForm.addEventListener('submit', () => {
  const profile = {
    name: `${popupEditInputName.value}`,
    about: `${popupEditInputAbout.value}`
  };
  setBtnLabel(popupEditBtn, true);
  api
    .setUserInfo(profile)
    .then(data => {
      renderProfile(data.name, data.about);
      closePopup(popupEdit);
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => setBtnLabel(popupEditBtn, false, 'Сохранить'));
});

// Функцианал редактирования аватара
popupAvatar.addEventListener('submit', () => {
  const link = popupAvatarInput.value;
  setBtnLabel(popupAvatarBtn, true);
  // handleImageLoaderState(profileAvatar, avatarSpinner, 'profile__avatar_error');
  api
    .setAvatar(link)
    .then(data => {
      profileAvatar.setAttribute('src', data.avatar);
      disableButton(popupAvatarBtn, validSettings.inactiveButtonClass);
      closePopup(popupAvatar);
      popupAvatarForm.reset();
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => setBtnLabel(popupAvatarBtn, false, 'Сохранить'));
});

//Функционал добавления карточки
popupAddForm.addEventListener('submit', () => {
  const data = {
    name: popupAddInputImgTitle.value,
    link: popupAddInputImgLink.value
  };
  setBtnLabel(popupAddBtn, true);
  api
    .postCard(data)
    .then(res => {
      addCard(res);
      disableButton(popupAddBtn, validSettings.inactiveButtonClass);
      closePopup(popupAdd);
      popupAddForm.reset();
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => setBtnLabel(popupAddBtn, false, 'Создать'));
});
*/
// ******************************************Работа с попамапи******************************************
//активация попапа с картинкой
const popupImageSelector = '.popup-photo';
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

//активация попапа редакцтирования профиля

const popupWithEditInfoSelector = '.popup-edit';
const editInfoFormSubmitCallback = data => {
  popupWithEditInfoForm.setBtnStatusSaving(true);
  api
    .setUserInfo(data) //---+++++Обновляет информацию о пользователе+++++---
    .then(res => {
      console.log('редактирование работает');
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      popupWithEditInfoForm.setBtnStatusSaving(false);
      popupWithEditInfoForm.close();
    });
};

const popupWithEditInfoForm = new PopupWithForm(
  popupWithEditInfoSelector,
  editInfoFormSubmitCallback
);
document.querySelector('.page-btn_type_edit').addEventListener('click', () => {
  renderProfileForm(); //todo предзаполнение. оставить тут или добавить в класс?
  popupWithEditInfoForm.open();
});

popupWithEditInfoForm.setEventListeners();

//активация попапа добавления карточки
const popupWithAddNewCardSelector = '.popup-add';
const addNewCardFormSubmitCallback = data => {
  popupWithAddNewCardForm.setBtnStatusSaving(true);
  api
    .postCard(data) //переписала ключ в api
    .then(res => {
      const card = createNewCard(res); //это дубль секшн, как его тут переиспользовать?
      const cardElement = card.generateCard();
      cards.addItem(cardElement, 'append');
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      popupWithAddNewCardForm.setBtnStatusSaving(false);
      popupWithAddNewCardForm.close();
    });
};

const popupWithAddNewCardForm = new PopupWithForm(
  popupWithAddNewCardSelector,
  addNewCardFormSubmitCallback
);

document.querySelector('.page-btn_type_add').addEventListener('click', () => {
  popupWithAddNewCardForm.open();
});
popupWithAddNewCardForm.setEventListeners();

//todo активация попапа редактиования аватара
const popupWithAvatarEditFormSelector = '.popup-avatar';
const avatarEditFormSubmitCallback = data => {
  //тут приходит объект, а не ссылка на аватарку...вытащить ссылку??
  popupWithAvatarEditForm.setBtnStatusSaving(true);
  console.log('input data', data);
  api
    .setAvatar(data) //todo не работает??
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log('ошибка установки аватара', err); // выводим ошибку в консоль
    })
    .finally(() => {
      popupWithAvatarEditForm.setBtnStatusSaving(false);
      popupWithAvatarEditForm.close();
    });
};
const popupWithAvatarEditForm = new PopupWithForm(
  popupWithAvatarEditFormSelector,
  avatarEditFormSubmitCallback
);

document
  .querySelector('.profile__avatar-container')
  .addEventListener('click', () => {
    popupWithAvatarEditForm.open();
  });
popupWithAvatarEditForm.setEventListeners();

//включение валидации для всех форм
const setValidation = formElement => {
  const popupValidator = new FormValidator(validSettings, formElement);
  popupValidator.enableValidation();
};

popupList.forEach(popup => {
  setValidation(popup);
});

// handleImageLoaderState(profileAvatar, avatarSpinner, 'profile__avatar_error');

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
