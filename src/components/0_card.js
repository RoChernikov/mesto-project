import {
  openConfirmPopup,
  openImagePopup,
  popupConfirm,
  closePopup,
  checkTargetAndRemoveDeleteMark
} from '../components/modal';

import { handleImageLoaderState } from '../components/utils';

import { api, currentUserId } from '../pages/index';

const cardsList = document.querySelector('.cards__list');

//---+++++Отображает кнопку удаления карточки+++++---
const showTrashBtn = (owner, trashBtn) => {
  if (owner._id === currentUserId) {
    trashBtn.classList.add('cards__trash-btn_visible');
  }
};

//---+++++Задает состояние лайкам+++++---
const initializeLikeState = (likesArr, btn, counter) => {
  if (likesArr.length > 0) {
    counter.classList.add('cards__like-counter_active');
  }
  if (likesArr.some(item => item._id === currentUserId)) {
    btn.classList.toggle('cards__like-btn_active');
  }
};

//---+++++Сворачивает контейнер лайков+++++---
const closeLikeContainer = counter => {
  counter.classList.remove('cards__like-counter_active');
};

//---+++++Разворачивает контейнер лайков+++++---
const openLikeContainer = counter => {
  setTimeout(() => {
    counter.classList.add('cards__like-counter_active');
  }, 200);
};

const setLikeCounter = (counter, data) =>
  (counter.textContent = data.likes.length);

//---+++++Увеличивает значение счетчика лайков+++++---
const increaseLikeCounter = (id, btn, counter) => {
  api
    .likeCard(id)
    .then(data => {
      btn.classList.add('cards__like-btn_active');
      setLikeCounter(counter, data);
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
};

//---+++++Уменьшает значение счетчика лайков+++++---
const decreaseLikeCounter = (id, btn, counter) => {
  api
    .dislikeCard(id)
    .then(data => {
      btn.classList.remove('cards__like-btn_active');
      setLikeCounter(counter, data);
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
};

//---+++++Переключает состояние кнопки лайка+++++---
const toggleLikeBtnState = (id, btn, counter) => {
  if (btn.classList.contains('cards__like-btn_active')) {
    decreaseLikeCounter(id, btn, counter);
  } else {
    increaseLikeCounter(id, btn, counter);
  }
};

//---+++++Переключает состояние лайка и его счетчика+++++---
const handleLike = (id, btn, counter) => {
  if (+counter.textContent === 0) {
    openLikeContainer(counter);
  } else if (
    +counter.textContent === 1 &&
    btn.classList.contains('cards__like-btn_active')
  ) {
    closeLikeContainer(counter);
  }
  toggleLikeBtnState(id, btn, counter);
};
//*******************************************************************************************************************
//------------------------------------+++++ФУНКЦИОНАЛ ОКНА С ПОДТВЕРЖДЕНИЕМ+++++-------------------------------------
//*******************************************************************************************************************

//---+++++Удаляет помеченную карточку (с сервера, а затем из разметки)+++++---
export const deleteTargetCard = () => {
  const target = document.querySelector('.delete-target');
  const id = target.id;
  popupConfirm.removeEventListener('submit', deleteTargetCard);
  api
    .deleteCard(id)
    .then(() => {
      target.remove();
      closePopup(popupConfirm);
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
};

//---+++++Помечает карточку, которую нужно удалить+++++---
const setDeleteMark = evt => {
  const target = evt.target.closest('.cards__item');
  target.classList.add('delete-target');
};

//---+++++Проверяет наличие помеченной карточки и удаляет пометку. Снимает слушатели+++++---
export const removeDeleteMark = evt => {
  const target = document.querySelector('.delete-target');
  if (target) {
    popupConfirm.removeEventListener('submit', deleteTargetCard);
    popupConfirm.removeEventListener('click', checkTargetAndRemoveDeleteMark);
    target.classList.remove('delete-target');
  }
};
//*******************************************************************************************************************
//*******************************************************************************************************************

//---+++++Создает карточку+++++---
const createCard = data => {
  //--------------------------------------------------------------------------переменные
  const card = document
    .querySelector('#card-template')
    .content.querySelector('.cards__item')
    .cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardHeading = card.querySelector('.cards__heading');
  const likeBtn = card.querySelector('.cards__like-btn');
  const likeCounter = card.querySelector('.cards__like-counter');
  const trashBtn = card.querySelector('.cards__trash-btn');
  const spinner = card.querySelector('.cards__spinner');
  //-------------------------------------------------------------------------наполнение
  card.id = `${data._id}`;
  cardImage.src = `${data.link}`;
  cardImage.alt = `${data.name}`;
  cardHeading.textContent = `${data.name}`;
  likeCounter.textContent = data.likes.length;
  //--------------------------------------------------------------------------слушатели
  trashBtn.addEventListener('click', evt => {
    setDeleteMark(evt);
    openConfirmPopup(evt);
  });
  cardImage.addEventListener('click', () => openImagePopup(data));
  likeBtn.addEventListener('click', () =>
    handleLike(data._id, likeBtn, likeCounter)
  );
  //----------------------------------------------------------------------------функции
  showTrashBtn(data.owner, trashBtn);
  handleImageLoaderState(cardImage, spinner, 'cards__image_error');
  initializeLikeState(data.likes, likeBtn, likeCounter);
  return card;
};

//---+++++Добавляет карточку в разметку+++++---
export const addCard = data => {
  cardsList.prepend(createCard(data));
};
