export default class ImageLoader {
  constructor(image, loaderName, errorClass) {
    this._image = image;
    this._loaderName = loaderName;
    this._errorClass = errorClass;
  }

  _loadImage() {
    return new Promise((resolve, reject) => {
      this._loaderName.classList.add('spinner_visible');
      this._image.onerror = reject;
      this._image.onload = resolve;
    });
  }

  initialize() {
    this._loadImage()
      .then(() => this._loaderName.classList.remove('spinner_visible'))
      .catch(() => {
        this._loaderName.classList.remove('spinner_visible');
        this._image.classList.add(errorClass);
      });
  }
}
