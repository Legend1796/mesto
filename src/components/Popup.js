export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupOnOverlayAndButton = this._closePopupOnOverlayAndButton.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  openPopup() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupOnOverlayAndButton);
  }

  _closePopupOnOverlayAndButton(evt) {
    if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close'))) {
      this.closePopup();
    }
  }
}