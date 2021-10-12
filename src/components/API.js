const token = '97ccf1bd-d259-459d-8352-7ffe6d750b35';
// const token = '6b01d125-5d4e-4598-bae6-699c6d34344a';
const url = 'https://nomoreparties.co/v1/plus-cohort-2/';
export const api = {
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  }
}

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
}

export const getUserInfo = () => {
  return fetch(`${api.baseUrl}users/me`, {
      headers: api.headers
    })
    .then(res => getResponseData(res))
}

export const getCards = () => {
  return fetch(`${api.baseUrl}cards`, {
      headers: api.headers,
    })
    .then(res => getResponseData(res))
}

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

export const deleteCard = (id) => {
  return fetch(`${api.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: api.headers,
    })
    .then(res => getResponseData(res))
}

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