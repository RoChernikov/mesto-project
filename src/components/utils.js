//---+++++Заполняет страницу дефолтными карточками+++++---
// import { addCard } from './Card';
export const generateCards = cardsArray => {
  cardsArray.reverse().forEach(data => {
    addCard(data);
  });
};
//todo перенесена в класс попап с формой
//---+++++Меняет надпись на кнопках форм+++++---
export const setBtnLabel = (btnName, isLoading, defaultText) => {
  if (isLoading) {
    btnName.value = 'Сохранение...';
  } else {
    btnName.value = defaultText;
  }
}; 
//todo перенесена в класс валидации
//---+++++Деактивирует submit формы+++++---
export const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
};

//---+++++Активирует submit формы+++++---
export const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'disabled');
};

//---+++++Лоадер изображений+++++---
// export function loadImage(image, loaderName) {
//   return new Promise((resolve, reject) => {
//     loaderName.classList.add('spinner_visible');
//     image.onerror = reject;
//     image.onload = resolve;
//   });
// }

// export function handleImageLoaderState(image, loaderName, errorClass) {
//   loadImage(image, loaderName, errorClass)
//     .then(() => {
//       loaderName.classList.remove('spinner_visible');
//     })
//     .catch(() => {
//       loaderName.classList.remove('spinner_visible');
//       image.classList.add(errorClass);
//     });
// }
