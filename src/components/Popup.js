export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector(this._popup)
      this.closePopup(popupOpened);
    }
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose(evt));
  }

  closePopup() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose(evt));
  }

  setEventListeners() {
    this._popup.addEventListener('click', function (evt) {
      if ((evt.target.className === 'popup__overlay') || (evt.target.className === 'popup__close')) {
        this.closePopup(popup);
      }
    });

  }

}