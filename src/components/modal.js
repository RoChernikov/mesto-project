import {
  removeCard
} from '../components/card'

const body = document.querySelector('.page');
const popupConfirm = document.querySelector('.popup-confirm');

//---+++++Открытие Pop-Up-ов+++++---
export const openPopup = (popup) => {
  const popupContainer = popup.querySelector('.popup__container')
  popupContainer.classList.add('popup__container_opened')
  popup.classList.add('popup_opened');
  body.classList.add('page_hold');
  document.addEventListener('keydown', closePopupEsc);
}

//---+++++Открытие Pop-Up-а с фотографией+++++---
export const openImagePopup = (data) => {
  const popupPhoto = document.querySelector('.popup-photo');
  const popupPhotoImage = popupPhoto.querySelector('.popup-photo__image');
  const popupPhotoFigcaption = popupPhoto.querySelector(
    '.popup-photo__figcaption'
  );
  popupPhotoImage.src = `${data.link}`;
  popupPhotoImage.alt = `${data.name}`;
  popupPhotoFigcaption.textContent = `${data.name}`;
  openPopup(popupPhoto);
}

//---+++++Открытие Pop-Up-а с подтверждением+++++---
export const openConfirmPopup = (evt) => {
  popupConfirm.addEventListener('submit', () => {
    removeCard(evt);
    closePopup(popupConfirm);
  });
  openPopup(popupConfirm);
}

//---+++++Закрытие Pop-Up-ов+++++---
export const closePopup = (popup) => {
  const popupContainer = popup.querySelector('.popup__container')
  popupContainer.classList.remove('popup__container_opened')
  popup.classList.remove('popup_opened');
  body.classList.remove('page_hold');
  document.removeEventListener('keydown', closePopupEsc);
}

//---+++++Функция закрытие Pop-Up-ов по нажатию ESC+++++---
function closePopupEsc(evt) {
  if (evt.key === 'Escape')
    closePopup(document.querySelector('.popup_opened'));
}