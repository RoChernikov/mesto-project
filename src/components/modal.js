//---+++++Открытие Pop-Up-ов+++++---
const body = document.querySelector('.page');
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  body.classList.add('page_hold');
  document.addEventListener('keydown', closePopupEsc);
}

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

//---+++++Закрытие Pop-Up-ов+++++---
export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  body.classList.remove('page_hold');
}

//---+++++Функция закрытие Pop-Up-ов по нажатию ESC+++++---
function closePopupEsc(evt) {
  if (evt.key === 'Escape')
    closePopup(document.querySelector('.popup_opened'));
  document.removeEventListener('keydown', closePopupEsc);
}