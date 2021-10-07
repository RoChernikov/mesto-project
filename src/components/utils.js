//---+++++Заполняем страницу дефолтными карточками+++++---
import addCard from '../components/card'
export const generateInitialCards = (defaultCardsArray) => {
  defaultCardsArray.forEach(data => {
    addCard(data);
  });
}
export const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
}

export const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'disabled');
}