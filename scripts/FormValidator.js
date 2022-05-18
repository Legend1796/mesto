import { params } from "./params.js";

export class FormValidator {
  constructor(params, form) {
    console.log(form);
    this._formSelector = form;
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
  }

  _setEventListeners() {
    console.log(this._inputSelector);
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    const buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formSelector, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
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
}