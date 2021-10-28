import Popup from './Popup';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmitCallback) { //Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
    super(popupSelector)
    this._formSubmitCallback = formSubmitCallback
    //элементы формы
    //this._popupForm

  }
  //Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    this._newInputValues = {}
    //цикл foreach
    return this._newInputValues
  }

  //    Перезаписывает родительский метод setEventListeners.
  //Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
  //но и добавлять обработчик сабмита формы.

  setEventListeners() {
    super.setEventListeners()
    // поместить в колбэк значения из _getInputValues
  }

  //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close()
    this._popupForm.reset()
  }
  //Текст на кнопке "сохранение"
}