import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHendler, formName) {
    super(popupSelector);
    this._submitHendler = submitHendler;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formForReset = this._popup.querySelector(formName);
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  getCardId(cardId) {
    this._formValues = cardId;
    console.log('2', this._formValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHendler(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    this._formForReset.reset();
    super.closePopup();
  }

  openPopup() {
    super.openPopup();
  }
}


