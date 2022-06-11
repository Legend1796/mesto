import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupImage = popupElement.querySelector('.popup__image');
    this._popupTitle = popupElement.querySelector('.popup__title');

  }
  openPopup(name, link) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    this._popupImage.alt = name;
    super.openPopup();
  }
}