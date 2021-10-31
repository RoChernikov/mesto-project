/*
Создайте класс PopupWithImage
Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.*/

import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoImage = this._popup.querySelector('.popup-photo__image'); 
    this._popupPhotoFigcaption = this._popup.querySelector('.popup-photo__figcaption');
  }

  open(data) {
    super.open();
    this._popupPhotoImage.src = `${data.link}`;
    this._popupPhotoImage.alt = `${data.name}`;
    this._popupPhotoFigcaption.textContent = `${data.name}`;    
  }
}