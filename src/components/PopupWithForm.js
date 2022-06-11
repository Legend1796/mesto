import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupElement, submitHendler) {
    super(popupElement);
    console.log('popupSelector:', popupElement);
    this._submitHendler = submitHendler;
    this._inputList = this._popup.querySelectorAll('.popup__input');
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
      console.log('form new', this.form);
      this._submitHendler(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    console.log('form old', popupElement.forms.mesto);
    popupElement.forms.mesto.reset();
    super.closePopup();
  }
}


