const token = '97ccf1bd-d259-459d-8352-7ffe6d750b35';
const url = 'https://nomoreparties.co/v1/plus-cohort-2/';
export const api = {
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  }
}

//---+++++Обработчик ответа сервера+++++---
const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
}

//---+++++Запрашивает информацию о пользователе+++++---
export const getUserInfo = () => {
  return fetch(`${api.baseUrl}users/me`, {
      headers: api.headers
    })
    .then(res => getResponseData(res))
}

//---+++++Обновляет информацию о пользователе+++++---
export const setUserInfo = (profile) => {
  return fetch(`${api.baseUrl}users/me`, {
      method: 'PATCH',
      headers: api.headers,
      body: JSON.stringify({
        name: profile.name,
        about: profile.about
      })
    })
    .then(res => getResponseData(res))
}

//---+++++Запрашивает карточки+++++---
export const getCards = () => {
  return fetch(`${api.baseUrl}cards`, {
      headers: api.headers,
    })
    .then(res => getResponseData(res))
}

//---+++++Постит карточки+++++---
export const postCard = (newCard) => {
  return fetch(`${api.baseUrl}cards`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      })
    })
    .then(res => getResponseData(res))
}

//---+++++Удаляет карточки+++++---
export const deleteCard = (id) => {
  return fetch(`${api.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: api.headers,
    })
    .then(res => getResponseData(res))
}

//---+++++Добавляет лайк карточке+++++---
export const likeCard = (id) => {
  return fetch(`${api.baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: api.headers,
    })
    .then(res => getResponseData(res))
}

//---+++++Удаляет лайк у карточки+++++---
export const dislikeCard = (id) => {
  return fetch(`${api.baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: api.headers,
    })
    .then(res => getResponseData(res))
}

//---+++++Обновляет аватар+++++---
export const setAvatar = (link) => {
  return fetch(`${api.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: api.headers,
      body: JSON.stringify({
        avatar: `${link}`
      })
    })
    .then(res => {
      getResponseData(res)
    })
}