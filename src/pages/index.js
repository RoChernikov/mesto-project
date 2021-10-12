import './index.css';
import {
  generateCards,
  disableButton,
  handleLoaderState,
} from '../components/utils'
import enableValidation from '../components/validate';
import addCard from '../components/card'
import {
  openPopup,
  closePopup,
} from '../components/modal'

import {
  api,
  getUserInfo,
  getCards,
  setUserInfo,
  setAvatar,
  postCard
} from '../components/API'

const validSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

//---+++++Глобальные переменные+++++---
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
//Pop-Up редактирования аватара
const popupAvatar = document.querySelector('.popup-avatar')
const popupAvatarForm = popupAvatar.querySelector('.form')
const popupAvatarInput = document.querySelector('.form__input_type_avatar-link')
//Pop-Up подтверждения
const popupConfirm = document.querySelector('.popup-confirm')
//Pop-Up добавления карточки
const popupAdd = document.querySelector('.popup-add');
const popupAddForm = popupAdd.querySelector('.form');
const popupAddInputImgTitle = popupAdd.querySelector(
  '.form__input_type_img-title'
);
const popupAddInputImgLink = popupAdd.querySelector(
  '.form__input_type_img-link'
);
const popupList = document.querySelectorAll('.popup');


// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

const loadProfile = () => {
  getUserInfo().then(data => {
    currentUserId = data._id;
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
  })
}

const loadAvatar = () => {
  getUserInfo()
    .then(data => {
      profileAvatar.setAttribute('src', `${data.avatar}`);
    })

}

const loadCards = () => {
  getUserInfo().then(data => {
    getCards().then(data => generateCards(data))
  })
}

function loadData() {
  loadProfile();
  loadAvatar();
  loadCards();
}

loadData();

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************




// Функция накладывает слушатель событий на все Pop-up-ы (закрытие)
function setPopupListener() {
  popupList.forEach(item => {
    item.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
        closePopup(evt.target.closest('.popup'));
    })
  })
}
setPopupListener();

const renderProfileForm = () => {
  popupEditInputName.value = profileName.textContent;
  popupEditInputAbout.value = profileAbout.textContent;
}

//Кнопка "редактировать"
document.querySelector('.page-btn_type_edit').addEventListener('click', () => {
  renderProfileForm();
  openPopup(popupEdit);
});

//Функцианал редактирования профиля
popupEditForm.addEventListener('submit', () => {
  const profile = {
    name: `${popupEditInputName.value}`,
    about: `${popupEditInputAbout.value}`
  }
  setUserInfo(profile);
  profileName.textContent = profile.name;
  profileAbout.textContent = profile.about;
  closePopup(popupEdit);
});

//Кнопка редактирования аватара
document
  .querySelector('.profile__avatar-container')
  .addEventListener('click', () => openPopup(popupAvatar));

// Функцианал редактирования аватара
popupAvatar.addEventListener('submit', (evt) => {
  const submitBtn = evt.target.querySelector('.form__submit')
  const link = popupAvatarInput.value;
  handleLoaderState(profileAvatar, avatarSpinner, 'profile__avatar_error');
  profileAvatar.src = link;
  setAvatar(link);
  popupAvatarForm.reset();
  disableButton(submitBtn, validSettings.inactiveButtonClass)
  closePopup(popupAvatar);
});

//Кнопка "добавить"
document
  .querySelector('.page-btn_type_add')
  .addEventListener('click', () => openPopup(popupAdd));

//Функционал добавления карточки
popupAddForm.addEventListener('submit', evt => {
  const submitBtn = evt.target.querySelector('.form__submit')
  const data = {
    name: popupAddInputImgTitle.value,
    link: popupAddInputImgLink.value,
  };
  popupAddForm.reset();
  disableButton(submitBtn, validSettings.inactiveButtonClass)
  postCard(data).then(res => addCard(res));
  closePopup(popupAdd);
});

enableValidation(validSettings);

handleLoaderState(profileAvatar, avatarSpinner, 'profile__avatar_error');