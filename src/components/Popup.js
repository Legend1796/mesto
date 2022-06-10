export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupOnOverlayAndButton = this._closePopupOnOverlayAndButton.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
      this._popup.classList.remove('popup_opened');
    }
  }

  openPopup() {
    console.log(this);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    console.log(this);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');


  }

  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupOnOverlayAndButton)
  }

  _closePopupOnOverlayAndButton(evt) {
    if ((evt.target.className === 'popup__overlay') || (evt.target.className === 'popup__close')) {
      this.closePopup();
    }
  }

  handleCardClick() {
    openPopup();
  }

}