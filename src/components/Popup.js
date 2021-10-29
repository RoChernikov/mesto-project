// todo Создайте класс Popup
/*Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:

    Принимает в конструктор единственный параметр — селектор попапа.
    Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
    Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
    
*/

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    //this._handleEscClose = this._
  }
    
  open() {
    const popupContainer = this._popup.querySelector('.popup__container');
    popupContainer.classList.add('popup__container_opened'); //todo зачем два раза?
    this._popup.classList.add('popup_opened');
    body.classList.add('page_hold'); // todo overflow: hidden;  зачем это?
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    const popupContainer = this._popup.querySelector('.popup__container');
    popupContainer.classList.remove('popup__container_opened');
    this._popup.classList.remove('popup_opened');
    body.classList.remove('page_hold');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
      //removeDeleteMark(evt);
    }
  }

//Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  _handleOverlayClose(evt) {
    // todo не нашла это в коде
  }

//Содержит публичный метод setEventListeners, который добавляет слушатель клика
// иконке закрытия попапа. 
  setEventListeners() {
    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
        //console.log('слушатель на попап установлен');
      }        
    });
  }
}
