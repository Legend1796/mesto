import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHendler) {
    super(popupSelector);
    this._submitHendler = submitHendler;
  }
  getCardIdForDelete(cardId) {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHendler(cardId);
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
  }

  openPopup() {
    super.openPopup();
  }
}