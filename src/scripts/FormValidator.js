import { params } from "./params.js";

export class FormValidator {
  constructor(params, form) {
    this._formSelector = form;
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
    this.inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
  }

  _setEventListeners() {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formSelector, inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.blockButton();

    } else {
      this.unblockButton();

    }
  };

  _hasInvalidInput = () => {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideError(formElement, inputElement);
    }
  };

  _showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorClass);
  };

  _hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
  };

  enableValidation() {
    this._setEventListeners();
  }

  resetErrors() {
    this.inputList.forEach((inputElement) => {
      this._hideError(this._formSelector, inputElement);
    });
  }

  blockButton() {
    console.log(this._buttonElement);
    this._buttonElement.classList.add(params.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  unblockButton() {
    this._buttonElement.classList.remove(params.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }


}