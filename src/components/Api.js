export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._authorization = options.headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `${this._authorization}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
  }
  setInitialCards(newCardData) {
    console.log(newCardData);
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link
      })
    })
  }
}