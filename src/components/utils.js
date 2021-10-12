//---+++++Заполняем страницу дефолтными карточками+++++---
import addCard from '../components/card'
export const generateCards = (cardsArray) => {
  cardsArray.reverse().forEach(data => {
    addCard(data);
  });
}
//---+++++Деактивирует submit формы+++++---
export const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
}
//---+++++Активирует submit формы+++++---
export const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'disabled');
}

//---+++++Лоадеры изображений+++++---
export function loadImage(image, loaderName) {
  return new Promise((resolve, reject) => {
    loaderName.classList.add('spinner_visible');
    image.onerror = reject;
    image.onload = resolve;
  })
}

export function handleLoaderState(image, loaderName, errorClass) {
  loadImage(image, loaderName, errorClass)
    .then(() => {
      loaderName.classList.remove('spinner_visible')
    })
    .catch(() => {
      loaderName.classList.remove('spinner_visible')
      image.classList.add(errorClass)
    });
}