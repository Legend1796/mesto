export class UserInfo {
  constructor(userName, userJob, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userAvatar = document.querySelector(userAvatar);
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
    this._userAvatar.src = userData.avatar;
    this._userId = userData._id;
  }

  getUserId() {
    return this._userId;
  }


}