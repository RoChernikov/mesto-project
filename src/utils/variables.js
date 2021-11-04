// -----------------------------------------------Параметры валидации
export const validSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
};
// ------------------------------------------------Параметры запросов
export const fetchParams = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2/',
  headers: {
    'authorization': '97ccf1bd-d259-459d-8352-7ffe6d750b35',
    'Content-Type': 'application/json'
  }
};
// ------------------------------------------------------DOM-элементы
//профиль
const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileAbout = profile.querySelector('.profile__about');
export const profileAvatar = profile.querySelector('.profile__avatar');
export const avatarSpinner = profile.querySelector('.profile__spinner');
//Pop-Up редактирования профиля
const popupEdit = document.querySelector('.popup-edit');
export const popupEditInputName = popupEdit.querySelector(
  '.form__input_type_name'
);
export const popupEditInputAbout = popupEdit.querySelector(
  '.form__input_type_about'
);
//Массив pop-up-ов
export const popupList = Array.from(document.querySelectorAll('.popup'));

// ---------------------------------------------------------селекторы
export const userNameSelector = '.profile__name';
export const userCaptionSelector = '.profile__about';
export const userAvatarSelector = '.profile__avatar';
export const popupAvatarSelector = '.popup-avatar';
export const popupAddSelector = '.popup-add';
export const popupImageSelector = '.popup-photo';
export const popupConfirmSelector = '.popup-confirm';
export const popupEditSelector = '.popup-edit';
export const containerSelector = '.cards__list';
export const cardTemplateSelector = '#card-template';
export const avatarErrorClass = 'profile__avatar_error';
