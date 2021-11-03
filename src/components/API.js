export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  //---+++++Запрашивает информацию о пользователе+++++---
  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: this.headers
    }).then(this._getResponseData);
  }

  //---+++++Обновляет информацию о пользователе+++++---
  setUserInfo(profile) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: profile.name,
        about: profile.about
      })
    }).then(this._getResponseData);
  }

  //---+++++Запрашивает карточки+++++---
  getCards() {
    return fetch(`${this.baseUrl}cards`, {
      headers: this.headers
    }).then(this._getResponseData);
  }

  //---+++++Постит карточки+++++---
  postCard(newCard) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: newCard.title,
        link: newCard.link
      })
    }).then(this._getResponseData);
  }

  //---+++++Удаляет карточки+++++---
  deleteCard(id) {
    return fetch(`${this.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this._getResponseData);
  }

  //---+++++Добавляет лайк карточке+++++---
  likeCard(id) {
    return fetch(`${this.baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    }).then(this._getResponseData);
  }

  //---+++++Удаляет лайк у карточки+++++---
  dislikeCard(id) {
    return fetch(`${this.baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this._getResponseData);
  }

  //---+++++Обновляет аватар+++++---
  setAvatar(link) {    
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link.avatarlink,
      })      
    }).then(this._getResponseData);
  }

  //---+++++Загрузка всех данных+++++---
  loadData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  //---+++++Обработчик ответа сервера+++++---
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
  }
}
