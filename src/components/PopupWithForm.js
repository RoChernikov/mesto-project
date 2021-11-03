import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector)
    this._formSubmitCallback = formSubmitCallback;
    this._popupForm = this._popup.querySelector('.form');
    this._formInputList = this._popupForm.querySelectorAll('.form__input');
    this._btnName = this._popupForm.querySelector('.form__submit');
    this._defaultText = this._btnName.value;
    this._newInputValues = {};
  }

  _getInputValues() {    
    this._formInputList.forEach(input => {   
      this._newInputValues[input.name] = input.value;      
    })
    return this._newInputValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
    })
  }

  close() {
    super.close();    
    this._popupForm.reset()
  }

  setBtnStatusSaving(isLoading) {
    if(isLoading) {
      this._btnName.value = 'Сохранение...';      
    } else {
      this._btnName.value = this._defaultText;
    }
  } 
}

