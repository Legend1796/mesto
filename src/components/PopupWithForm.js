import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.submitHendler = this.submitHendler;

  }
  openPopup() {




    super.openPopup();
  }

  closePopup() {



    super.closePopup();
  }
  setEventListener() {
    this._popup.addEventListener('submit', () => {
      this.submitHendler()
    })
  }

}