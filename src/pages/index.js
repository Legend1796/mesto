import '../pages/index.css';
import { Card } from "../components/Card.js";
import { FormValidator, params } from '../components/FormValidator.js';
import { Popup } from '../components/Popup';

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

// function closePopupOnEsc(evt) {
//   if (evt.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened')
//     closePopup(popupOpened);
//   }
// }

// popup.forEch((popup) => {
// popup.addEventListener('click', function (evt) {
//   if ((evt.target.className === 'popup__overlay') || (evt.target.className === 'popup__close')) {
//     closePopup(popup);
//   }
// });
// });
popup.forEach((popupSelector) => {
  const popup = new Popup(popupSelector);
  popup.setEventListeners();
});

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
    const formValidator = new FormValidator(params);
    formValidator.enableValidation(params);
    formValidator._hideError(formElement, inputElement);
  });
  console.log(popupProfile);
  const popup = new Popup(popupProfile);
  popup.openPopup();
}

popupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  const popup = new Popup(popupProfile);
  popup.closePopup(popupProfile);
});

document.querySelector('.profile__add-btn').addEventListener('click', () => {
  const popup = new Popup(newSpaceElement);
  popup.openPopup();
});

newSpaceElement.addEventListener('submit', handleAddCardFormSubmit);

export function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const item = [];
  item.name = cardName;
  item.link = cardLink;
  document.forms.mesto.reset();
  const card = new Card(item);
  const cardElement = card.renderCard();
  cardList.prepend(cardElement)
  const buttonElement = newSpaceElement.querySelector('.popup__save-btn');
  buttonElement.classList.add('popup__save-btn_disabled');
  buttonElement.setAttribute('disabled', true);
  const popup = new Popup(newSpaceElement);
  popup.closePopup(newSpaceElement);
};