import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector('.popup__image');
    this._popupTitle = document.querySelector('.popup__title');

  }
  openPopup(data) {
    this._popupImage.src = data.link;
    this._popupTitle.textContent = data.name;
    this._popupImage.alt = data.name;
    super.openPopup();
  }
}