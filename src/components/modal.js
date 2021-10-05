//---+++++Открытие Pop-Up-ов+++++---
const body = document.querySelector('.page');
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  closePopupEsc(popup);
  body.style.overflow = 'hidden';
}

export const openImagePopup = (data) => {
  const popupPhoto = document.querySelector('.popup-photo');
  popupPhoto.querySelector('.popup-photo__image').src = `${data.link}`;
  popupPhoto.querySelector(
    '.popup-photo__figcaption'
  ).textContent = `${data.name}`;
  openPopup(popupPhoto);
}

//---+++++Закрытие Pop-Up-ов+++++---
export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  body.style.overflow = 'scroll';
}

//---+++++Функция закрытие Pop-Up-ов по нажатию ESC+++++---
function closePopupEsc(popup) {
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape')
      closePopup(popup);
  })
}