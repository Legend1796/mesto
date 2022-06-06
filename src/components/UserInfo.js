export class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    }
  }
  setUserInfo(userData) {
    console.log(userData);
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.job;
    // осталось добавить на страницу в инпуты
  }
}