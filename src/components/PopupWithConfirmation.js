import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.deleteCard();
    });
  }

  getCardIdForDelete(deleteCard) {
    this.deleteCard = deleteCard;
  };

  closePopup() {
    super.closePopup();
  }

  openPopup() {
    super.openPopup();
  }
}