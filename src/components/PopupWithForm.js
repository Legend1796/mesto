import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHendler) {
    super(popupSelector);
    this._submitHendler = submitHendler;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._forms = document.forms.mesto;
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('form new', this);
      this._submitHendler(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    this._forms.reset();
    super.closePopup();
  }

  openPopup() {
    super.openPopup();
  }
}


