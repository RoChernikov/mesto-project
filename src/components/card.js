import {
  openImagePopup
} from '../components/modal'

import {
  deleteCard,
  likeCard,
  dislikeCard
} from './API'

import {
  handleImageLoaderState,
} from '../components/utils'

import {
  currentUserId
} from '../pages/index'

//---+++++Сворачивает контейнер лайков+++++---
const closeLikeContainer = (counter) => {
  counter.classList.remove('cards__like-counter_active');
}
//---+++++Разворачивает контейнер лайков+++++---
const openLikeContainer = (counter) => {
  counter.classList.add('cards__like-counter_active');
}
//---+++++Увеличивает значение счетчика лайков+++++---
const increaseLikeCounter = (id, btn, counter) => {
  likeCard(id)
    .then(() => {
      btn.classList.add('cards__like-btn_active');
    })
  counter.textContent = +counter.textContent + 1;
}
//---+++++Уменьшает значение счетчика лайков+++++---
const decreaseLikeCounter = (id, btn, counter) => {
  dislikeCard(id)
    .then(() => {
      btn.classList.remove('cards__like-btn_active');
    })
  counter.textContent = +counter.textContent - 1;
}
//---+++++Переключает состояние кнопки лайка+++++---
const toggleLikeBtnState = (id, btn, counter) => {
  if (btn.classList.contains('cards__like-btn_active')) {
    decreaseLikeCounter(id, btn, counter);
  } else {
    increaseLikeCounter(id, btn, counter);
  }
}
//---+++++Удаляет карточку+++++---
const removeCard = (evt) => {
  const item = evt.target.closest('.cards__item');
  item.remove();
  deleteCard(item.id);
}
//---+++++Отображает кнопку удаления карточки+++++---
const showTrashBtn = (owner, trashBtn) => {
  if (owner._id === currentUserId) {
    trashBtn.classList.add('cards__trash-btn_visible');
  }
}
//---+++++Задает состояние лайкам+++++---
const initializeLikeState = (likesArr, btn, counter) => {
  if (likesArr.length > 0) {
    counter.classList.add('cards__like-counter_active')
  }
  if (likesArr.some(item => item._id === currentUserId)) {
    btn.classList.toggle('cards__like-btn_active');
  }
}
//---+++++Переключает состояние лайка и его счетчика+++++---
const handleLike = (id, btn, counter) => {
  if (+counter.textContent === 0) {
    openLikeContainer(counter);
  } else if (+counter.textContent === 1 && btn.classList.contains('cards__like-btn_active')) {
    closeLikeContainer(counter);
  }
  toggleLikeBtnState(id, btn, counter);
}
//---+++++Создает карточку+++++---
const createCard = (data) => {
  //--------------------------------------------------------------------------переменные
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardHeading = card.querySelector('.cards__heading');
  const likeBtn = card.querySelector('.cards__like-btn');
  const likeCounter = card.querySelector('.cards__like-counter');
  const trashBtn = card.querySelector('.cards__trash-btn');
  const spinner = card.querySelector('.cards__spinner');
  const likes = data.likes;
  //-------------------------------------------------------------------------наполнение
  card.id = `${data._id}`;
  cardImage.src = `${data.link}`;
  cardImage.alt = `${data.name}`;
  cardHeading.textContent = `${data.name}`;
  likeCounter.textContent = data.likes.length;
  //--------------------------------------------------------------------------слушатели
  trashBtn.addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => openImagePopup(data));
  likeBtn.addEventListener('click', () => handleLike(data._id, likeBtn, likeCounter));
  //----------------------------------------------------------------------------функции
  showTrashBtn(data.owner, trashBtn);
  handleImageLoaderState(cardImage, spinner, 'cards__image_error');
  initializeLikeState(data.likes, likeBtn, likeCounter);
  return card;
}

//---+++++Добавляет карточку в разметку+++++---
export default function addCard(data) {
  const cardsList = document.querySelector('.cards__list');
  cardsList.prepend(createCard(data));
}