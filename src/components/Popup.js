export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      // this.closePopup(); Не работает по ескейп
      // this._popup.classList.remove('popup_opened');
    }
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    console.log('evt.key');
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', function (evt) {
      if ((evt.target.className === 'popup__overlay') || (evt.target.className === 'popup__close')) {
        this.closePopup;
      }
    });

  }

}