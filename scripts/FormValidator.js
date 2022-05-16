// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// enableValidation(params);

// // Функция, которая добавляет класс с ошибкой
// const showError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(params.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(params.errorClass);
// };

// // Функция, которая удаляет класс с ошибкой
// const hideError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(params.inputErrorClass);
//   errorElement.classList.remove(params.errorClass);
//   errorElement.textContent = '';
// };

// // Функция, которая проверяет валидность поля
// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideError(formElement, inputElement);
//   }
// };

// // Функция, которая передает элемент, который нужно проверить
// function setEventListeners(formElement) {
//   const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
//   const buttonElement = formElement.querySelector(params.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// }

// function enableValidation() {
//   const formList = Array.from(document.querySelectorAll(params.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement);
//   });
// }

// // Функция принимает массив полей и ищет хотя бы одно поле, которое не прошло валидацию
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// // Функция добавляет или удаляет класс неактивной кнопки в зависимости от валидности инпутов
// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(params.inactiveButtonClass);
//     buttonElement.setAttribute('disabled', true);
//   } else {
//     buttonElement.classList.remove(params.inactiveButtonClass);
//     buttonElement.removeAttribute('disabled');
//   }
// };

export class FormValidator {
  constructor(params) {
    this._formSelector = params.formSelector;
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
  }
  // Функция, которая передает элемент, который нужно проверить
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  // Функция добавляет или удаляет класс неактивной кнопки в зависимости от валидности инпутов
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };
  // Функция принимает массив полей и ищет хотя бы одно поле, которое не прошло валидацию
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  // Функция, которая проверяет валидность поля
  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideError(formElement, inputElement);
    }
  };
  // Функция, которая добавляет класс с ошибкой
  _showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorClass);
  };
  // Функция, которая удаляет класс с ошибкой
  _hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
  };

  enableValidation(params) {
    console.log('esgwe');
    const formList = Array.from(document.querySelectorAll(params.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }
}
// FormValidator.enableValidation(params);

const formValidator = new FormValidator(params);
formValidator.enableValidation(params);


// initialCards.forEach((item) => {
//   const card = new Card(item);
//   const cardElement = card.renderCard();
//   document.querySelector('.elements').append(cardElement);
// });