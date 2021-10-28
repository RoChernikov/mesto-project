// import { removeDeleteMark, deleteTargetCard } from './Card';

export const popupConfirm = document.querySelector('.popup-confirm');
const body = document.querySelector('.page');
const popupPhoto = document.querySelector('.popup-photo');
const popupPhotoImage = popupPhoto.querySelector('.popup-photo__image');
const popupPhotoFigcaption = popupPhoto.querySelector(
  '.popup-photo__figcaption'
);

//---+++++Открытие Pop-Up-ов+++++---
export const openPopup = popup => {
  const popupContainer = popup.querySelector('.popup__container');
  popupContainer.classList.add('popup__container_opened');
  popup.classList.add('popup_opened');
  body.classList.add('page_hold');
  document.addEventListener('keydown', closePopupByEsc);
};

//---+++++Открытие Pop-Up-а с фотографией+++++---
export const openImagePopup = data => {
  popupPhotoImage.src = `${data.link}`;
  popupPhotoImage.alt = `${data.name}`;
  popupPhotoFigcaption.textContent = `${data.name}`;
  openPopup(popupPhoto);
};

//*******************************************************************************************************************
//------------------------------------+++++ФУНКЦИОНАЛ ОКНА С ПОДТВЕРЖДЕНИЕМ+++++-------------------------------------
//*******************************************************************************************************************

//---+++++Проверяет target и удаляет пометку об удалении с карточки+++++---
export const checkTargetAndRemoveDeleteMark = evt => {
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close-btn')
  ) {
    removeDeleteMark(evt);
  }
};

//---+++++Открытие Pop-Up-а с подтверждением+++++---
export const openConfirmPopup = evt => {
  openPopup(popupConfirm);
  popupConfirm.addEventListener('submit', deleteTargetCard);
  popupConfirm.addEventListener('click', checkTargetAndRemoveDeleteMark);
};

//*******************************************************************************************************************
//*******************************************************************************************************************

//---+++++Закрытие Pop-Up-ов+++++---
export const closePopup = popup => {
  const popupContainer = popup.querySelector('.popup__container');
  popupContainer.classList.remove('popup__container_opened');
  popup.classList.remove('popup_opened');
  body.classList.remove('page_hold');
  document.removeEventListener('keydown', closePopupByEsc);
};

//---+++++Функция закрытие Pop-Up-ов по нажатию ESC+++++---
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    removeDeleteMark(evt);
  }
}
