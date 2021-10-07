import {
  openImagePopup
} from '../components/modal'

const toggleLikeState = (evt) => {
  evt.target.classList.toggle('cards__like-btn_active')
}

const removeCard = (evt) => {
  evt.target.closest('.cards__item').remove()
}

const createCard = (data) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardHeading = card.querySelector('.cards__heading');
  const likeBtn = card.querySelector('.cards__like-btn');
  const trashBtn = card.querySelector('.cards__trash-btn');
  cardImage.src = `${data.link}`;
  cardImage.alt = `${data.name}`;
  cardHeading.textContent = `${data.name}`;
  likeBtn.addEventListener('click', toggleLikeState);
  trashBtn.addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => openImagePopup(data));
  return card;
}

//Функция добавления карточки
export default function addCard(data) {
  const cardsList = document.querySelector('.cards__list');
  cardsList.prepend(createCard(data));
}