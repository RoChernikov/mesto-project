import {
  openImagePopup
} from '../components/modal'

import {
  deleteCard
} from './API'

import {
  handleImageLoaderState,
} from '../components/utils'

import {
  currentUserId
} from '../pages/index'

const toggleLikeState = (evt) => {
  evt.target.classList.toggle('cards__like-btn_active')

  const likeCounter = evt.target.closest('.cards__item').querySelector('.cards__like-counter')
  likeCounter.classList.toggle('cards__like-counter_active')
}

const removeCard = (evt) => {
  const item = evt.target.closest('.cards__item');
  item.remove();
  deleteCard(item.id);
}

const showTrashBtn = (owner, trashBtn) => {
  if (owner._id === currentUserId) {
    trashBtn.classList.add('cards__trash-btn_visible');
  }
}

const createCard = (data) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardHeading = card.querySelector('.cards__heading');
  const likeBtn = card.querySelector('.cards__like-btn');
  const trashBtn = card.querySelector('.cards__trash-btn');
  const spinner = card.querySelector('.cards__spinner');
  cardImage.src = `${data.link}`;
  cardImage.alt = `${data.name}`;
  card.id = `${data._id}`;
  cardHeading.textContent = `${data.name}`;
  likeBtn.addEventListener('click', toggleLikeState);
  trashBtn.addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => openImagePopup(data));
  showTrashBtn(data.owner, trashBtn);
  handleImageLoaderState(cardImage, spinner, 'cards__image_error')
  return card;
}

//Функция добавления карточки
export default function addCard(data) {
  const cardsList = document.querySelector('.cards__list');
  cardsList.prepend(createCard(data));
}