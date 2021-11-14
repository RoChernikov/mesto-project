export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    const popupContainer = this._popup.querySelector('.popup__container');
    popupContainer.classList.add('popup__container_opened');
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
    this._toggleScrollHolder();
  }

  close() {
    const popupContainer = this._popup.querySelector('.popup__container');
    popupContainer.classList.remove('popup__container_opened');
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
    this._toggleScrollHolder();
  }

  _handleClickClose(evt) {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-btn')
    ) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.addEventListener('click', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _toggleScrollHolder() {
    const body = document.querySelector('.page');
    body.classList.toggle('page_hold');
  }
}
