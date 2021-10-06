//---+++++Заполняем страницу дефолтными карточками+++++---
import addCard from '../components/card'
export const generateInitialCards = (defaultCardsArray) => {
  defaultCardsArray.forEach(data => {
    addCard(data);
  });
}