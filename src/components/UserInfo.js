export default class UserInfo {
  constructor({ userNameSelector, userCaptionSelector }) {
    this._userNameSelector = userNameSelector;
    this._userCaptionSelector = userCaptionSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._caption = document.querySelector(this._userCaptionSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._caption.textContent
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._caption.textContent = data.about;
  }
}
