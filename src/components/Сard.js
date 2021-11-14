export default class Card {
  constructor(
    { likes, link, name, owner, _id: id },
    currentUserId,
    templateSelector,
    { handleCardClick, handleCardDelete, handleLikeClick, cardImageloader }
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._likes = likes;
    this._id = id;
    this._ownerId = owner._id;
    this._currentUserId = currentUserId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._imageloader = cardImageloader;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.cards__image');
    this._cardHeading = this._card.querySelector('.cards__heading');
    this._likeCounter = this._card.querySelector('.cards__like-counter');
    this._likeBtn = this._card.querySelector('.cards__like-btn');
    this._trashBtn = this._card.querySelector('.cards__trash-btn');
    this._spinner = this._card.querySelector('.cards__spinner');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardHeading.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._setTrashBtnState();
    this._setLikeState();
    this._setEventListeners();
    this._imageloader();
    return this._card;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  isLiked() {
    return this._isLiked;
  }

  setLike(data) {
    this._isLiked =
      data.likes.filter(item => {
        return item._id == this._currentUserId;
      }).length > 0;
    this._likeCounter.textContent = data.likes.length;
    if (this._isLiked) {
      this._likeBtn.classList.add('cards__like-btn_active');
    } else {
      this._likeBtn.classList.remove('cards__like-btn_active');
    }
    this._toggleLikeContainer(data);
  }

  _toggleLikeContainer(data) {
    if (data.likes.length === 1)
      this._likeCounter.classList.add('cards__like-counter_active');
    else if (data.likes.length === 0) {
      this._likeCounter.classList.remove('cards__like-counter_active');
    }
  }

  _setTrashBtnState() {
    if (this._ownerId === this._currentUserId) {
      this._trashBtn.classList.add('cards__trash-btn_visible');
    }
  }

  _setLikeState() {
    if (this._likes.length > 0) {
      this._likeCounter.classList.add('cards__like-counter_active');
    }
    if (this._likes.some(item => item._id === this._currentUserId)) {
      this._likeBtn.classList.add('cards__like-btn_active');
      this._isLiked = true;
    }
  }

  _setEventListeners() {
    this._trashBtn
      .addEventListener('click', () => this._handleCardDelete());
    this._likeBtn
      .addEventListener('click', () => this._handleLikeClick());
    this._cardImage
      .addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
}
