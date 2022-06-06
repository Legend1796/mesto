import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.submitHendler = this.submitHendler;

  }
  _getInputValues() {
    //который собирает данные всех полей формы.




  }

  setEventListeners() {

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


