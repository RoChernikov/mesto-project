import {
  openImagePopup
} from '../components/modal'

const createCard = (data) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
  card.querySelector('.cards__image').src = `${data.link}`;
  card.querySelector('.cards__heading').textContent = `${data.name}`;
  card
    .querySelector('.cards__image')
    .addEventListener('click', () => openImagePopup(data));
  return card;
}

//Функция добавления карточки
export const addCard = (data) => {
  const cardsList = document.querySelector('.cards__list');
  cardsList.prepend(createCard(data));
}

export const setCardsLikeBtnsListeners = () => {
  const cardsList = document.querySelector('.cards__list');
  cardsList.addEventListener('click', evt => {
    if (evt.target.classList.contains('cards__like-btn'))
      evt.target.classList.toggle('cards__like-btn_active')
  })
}

export const setCardsTrashBtnsListeners = () => {
  const cardsList = document.querySelector('.cards__list');
  cardsList.addEventListener('click', evt => {
    if (evt.target.classList.contains('cards__trash-btn'))
      evt.target.closest('.cards__item').remove()
  })
}