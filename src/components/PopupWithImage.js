import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector('.popup__image');
    this._popupTitle = document.querySelector('.popup__title');

  }
  openPopup(name, link) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    this._popupImage.alt = name;
    super.openPopup();
  }
}