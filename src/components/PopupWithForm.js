import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) { //Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
    super(popupSelector)
    this._formSubmitCallback = formSubmitCallback;
    //элементы формы
    this._popupForm = this._popup.querySelector('.form');
    this._formInputList = this._popupForm.querySelectorAll('.form__input');
    this._btnName = this._popupForm.querySelector('.form__submit');
    this._defaultText = this._btnName.value;
    this._newInputValues = {};
  }
  //Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {    
    this._formInputList.forEach(input => {   
      this._newInputValues[input.name] = input.value;      
    })
    console.log('input data пришла в  _getInputValues', this._newInputValues);
    return this._newInputValues
  }

  //    Перезаписывает родительский метод setEventListeners.
  //Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
  //но и добавлять обработчик сабмита формы.

  setEventListeners() {
    super.setEventListeners()
    // поместить в колбэк значения из _getInputValues
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
    })
  }

  //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();    
    this._popupForm.reset()
  }

  //Текст на кнопке "сохранение" во время загрузки данных
  setBtnStatusSaving(isLoading) {
    if(isLoading) {
      this._btnName.value = 'Сохранение...';      
    } else {
      this._btnName.value = this._defaultText;
    }
  } 
}

