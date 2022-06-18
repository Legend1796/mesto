import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  getCardIdForDelete(cardId, deleteCard) {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this.deleteCard = deleteCard;
      evt.preventDefault();
      this.deleteCard(cardId);
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