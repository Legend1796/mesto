import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHendler, formName) {
    super(popupSelector);
    this._submitHendler = submitHendler;
    this._formForReset = this._popup.querySelector(formName);
    this._inputList = this._formForReset.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  renderButtonText(text) {
    this._popup.querySelector('.popup__save-btn').textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHendler(this._getInputValues());
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