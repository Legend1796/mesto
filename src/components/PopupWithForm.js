import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHendler) {
    super(popupSelector);
    this._submitHendler = submitHendler;

  }
  _getInputValues() {
    //собирает данные всех полей формы.
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  setEventListeners() {

    super.setEventListeners();
    console.log(this._popup);
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHendler(this, this._getInputValues());
    });
    // // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса 
    // PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять о
    // бработчик сабмита формы.


  }
  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.++++++++
  closePopup() {
    document.forms.mesto.reset();
    Popup.closePopup();
  }


}


