export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    const popupContainer = this._popup.querySelector('.popup__container');
    const body = document.querySelector('.page');
    popupContainer.classList.add('popup__container_opened');
    this._popup.classList.add('popup_opened');
    body.classList.add('page_hold'); // todo сделать по красоте
    this.setEventListeners();
  }

  close() {
    const popupContainer = this._popup.querySelector('.popup__container');
    const body = document.querySelector('.page');
    popupContainer.classList.remove('popup__container_opened');
    this._popup.classList.remove('popup_opened');
    body.classList.remove('page_hold');
    this._removeEventListeners();
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

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
