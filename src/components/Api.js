export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  setInitialCards(newCardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  setAvatar(linkAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkAvatar.link
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  _getResponseData(res) {
    if (res.ok) {
      console.log(res.ok);
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}