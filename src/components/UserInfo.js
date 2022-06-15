export class UserInfo {
  constructor(userName, userJob) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    }
  }
  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.about;

    fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
      headers: {
        authorization: 'f14e4888-1d0c-41bb-80a1-fc5f4ce8b4db'
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      });
  }
}

