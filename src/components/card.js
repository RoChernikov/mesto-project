import ImageLoader from './ImageLoader';
import { api } from '../pages/index';
export default class Card {
  constructor(
    { likes, link, name, owner, _id: id },
    currentUserId,
    templateSelector,
   // handleCardClick
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._likes = likes;
    this._id = id;
    this._ownerId = owner._id;
    this._currentUserId = currentUserId;
    // this._handleCardClick = handleCardClick;
    // this._handleCardDelete = handleCardDelete;
    // this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  _setTrashBtnState() {
    if (this._ownerId === this._currentUserId) {
      this._card
        .querySelector('.cards__trash-btn')
        .classList.add('cards__trash-btn_visible');
    }
  }

  _initializeLikeState() {
    if (this._likes.length > 0)
      this._card
        .querySelector('.cards__like-counter')
        .classList.add('cards__like-counter_active');
    if (this._likes.some(item => item._id === this._currentUserId))
      this._card
        .querySelector('.cards__like-btn')
        .classList.toggle('cards__like-btn_active');
  }
  // **********************************************ЛАЙКИ*************************************************
  // ****************************************************************************************************

  //---+++++Сворачивает контейнер лайков+++++---
  _closeLikeContainer() {
    this._likeCounter.classList.remove('cards__like-counter_active');
  }

  //---+++++Разворачивает контейнер лайков+++++---
  _openLikeContainer() {
    setTimeout(() => {
      this._likeCounter.classList.add('cards__like-counter_active');
    }, 200);
  }

  setLikeCounter() {
    this._likeCounter.textContent = this._likes.length;
  }

  //---+++++Увеличивает значение счетчика лайков+++++---
  _increaseLikeCounter() {
    api
      .likeCard(this._id)
      .then(data => {
        this._likeBtn.classList.add('cards__like-btn_active');
        this.setLikeCounter();
      })
      .catch(err => {
        console.log(err); // выводим ошибку в консоль
      });
  }

  //---+++++Уменьшает значение счетчика лайков+++++---
  _decreaseLikeCounter() {
    api
      .dislikeCard(this._id)
      .then(data => {
        this._likeBtn.classList.remove('cards__like-btn_active');
        this.setLikeCounter();
      })
      .catch(err => {
        console.log(err); // выводим ошибку в консоль
      });
  }

  //---+++++Переключает состояние кнопки лайка+++++---
  _toggleLikeBtnState() {
    if (this._likeBtn.classList.contains('cards__like-btn_active')) {
      this._decreaseLikeCounter();
    } else {
      this._increaseLikeCounter();
    }
  }

  //---+++++Переключает состояние лайка и его счетчика+++++---
  _handleLikeClick() {
    if (+this._likeCounter.textContent === 0) {
      this._openLikeContainer();
    } else if (
      +this._likeCounter.textContent === 1 &&
      this._likeBtn.classList.contains('cards__like-btn_active')
    ) {
      this._closeLikeContainer();
    }
    this._toggleLikeBtnState();
  }
  // ****************************************************************************************************
  // 
  // ****************************************************************************************************

  _setEventListeners() {
    // this._card
    //   .querySelector('.cards__trash-btn')
    //   .addEventListener('click', () => this._handleCardDelete());
    this._card
      .querySelector('.cards__like-btn')
      .addEventListener('click', () => this._handleLikeClick());
    // this._card
    //   .querySelector('.cards__image')
    //   .addEventListener('click', () =>
    //     this._handleCardClick(this._name, this._link)
    //   );
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.cards__image');
    this._cardHeading = this._card.querySelector('.cards__heading');
    this._likeCounter = this._card.querySelector('.cards__like-counter');
    this._likeBtn = this._card.querySelector('.cards__like-btn');
    this._spinner = this._card.querySelector('.cards__spinner');
    const imageLoader = new ImageLoader(
      this._cardImage,
      this._spinner,
      'cards__image_error'
    );
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardHeading.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._setTrashBtnState();
    this._initializeLikeState();
    this._setEventListeners();
    imageLoader.initialize();
    return this._card;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
}
