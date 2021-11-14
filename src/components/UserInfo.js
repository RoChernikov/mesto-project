export default class UserInfo {
  constructor({ userNameSelector, userCaptionSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userCaptionSelector = userCaptionSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._caption = document.querySelector(this._userCaptionSelector);
    this._userAvatar = document.querySelector(this._userAvatarSelector);    
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._caption.textContent
    };
  }

  setUserInfo(data) {
    this.userId = data._id;
    this._name.textContent = data.name;
    this._caption.textContent = data.about;
    this._userAvatar.src = data.avatar;     
  }
}
