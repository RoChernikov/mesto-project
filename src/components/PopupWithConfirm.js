import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._popup = document.querySelector(this._popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submit = submit;
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._submit(this._id);
    this._form.removeEventListener('submit', this._submitEvtHandler);
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitEvtHandler);
    super.setEventListeners();
  }

  open(id) {
    this.setEventListeners();
    this._id = id;
    super.open();
  }
}
