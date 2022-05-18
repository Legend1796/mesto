// / импорт классов Card и FormValidator
import { Card } from "./Card.js";
import { FormValidator } from './FormValidator.js';
import { initialCards } from "./initialCards.js";
import { params } from "./params.js";

const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const newSpaceElement = document.querySelector('.popup_new-space');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const cardNameInput = document.querySelector('.popup__input_type_name-space');
const cardLinkInput = document.querySelector('.popup__input_type_link-space');
const cardList = document.querySelector('.elements');

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

popup.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if ((evt.target.className === 'popup__overlay') || (evt.target.className === 'popup__close')) {
      closePopup(popup);
    }
  });
});

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupOnEsc);
}

document.querySelector('.profile__edit-btn').addEventListener('click', addTextFromProfile);

function addTextFromProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  const buttonElement = popupProfile.querySelector('.popup__save-btn');
  buttonElement.classList.remove('popup__save-btn_disabled');
  buttonElement.removeAttribute('disabled');
  const formElement = document.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  inputList.forEach((inputElement) => {
    const formValidator = new FormValidator(params, form);
    formValidator.enableValidation(params);
    formValidator._hideError(formElement, inputElement);
  });
  openPopup(popupProfile);
}

popupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupProfile);
});

document.querySelector('.profile__add-btn').addEventListener('click', () => openPopup(newSpaceElement));

newSpaceElement.addEventListener('submit', handleAddCardFormSubmit);

export function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const item = {};
  item.name = cardName;
  item.link = cardLink;
  document.forms.mesto.reset();
  cardList.prepend(createNewCardclass(item))
  const buttonElement = newSpaceElement.querySelector('.popup__save-btn');
  buttonElement.classList.add('popup__save-btn_disabled');
  buttonElement.setAttribute('disabled', true);
  closePopup(newSpaceElement);
};

initialCards.forEach((item) => {

  document.querySelector('.elements').append(createNewCardclass(item));
});

function createNewCardclass(item) {
  const card = new Card(item, '.elem');
  const cardElement = card.renderCard();
  return cardElement;
}

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((form) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const formValidator = new FormValidator(params, form);
  formValidator.enableValidation();
});
// const formValidator = new FormValidator(params);
// formValidator.enableValidation();