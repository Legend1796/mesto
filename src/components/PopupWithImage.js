import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__title');
  }
  openPopup(name, link) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    this._popupImage.alt = name;
    super.openPopup();
  }
  setEventListeners() {
    super.setEventListeners();
  }
}