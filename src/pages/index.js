import '../pages/index.css';
import { Card, initialCards } from "../components/Card.js";
import { FormValidator, params } from '../components/FormValidator.js';
import { Popup } from '../components/Popup';
import { Section } from '../components/Section';
import { UserInfo } from '../components/UserInfo';

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

popup.forEach((popupSelector) => {
  const popup = new Popup(popupSelector);
  popup.setEventListeners();
});

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item);
    const cardElement = card.renderCard();
    section.addtItem(cardElement);
  }
}, cardList);
section.renderItems();

document.querySelector('.profile__edit-btn').addEventListener('click', addTextFromProfile);

function addTextFromProfile() {
  const userInfo = new UserInfo(userName, userJob);
  userInfo.setUserInfo(userInfo.getUserInfo());






  // nameInput.value = userName.textContent;
  // jobInput.value = userJob.textContent;
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
  const popup = new Popup(popupProfile);
  popup.openPopup();
}

// popupProfile.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   userName.textContent = nameInput.value;
//   userJob.textContent = jobInput.value;
//   const popup = new Popup(popupProfile);
//   popup.closePopup(popupProfile);
// });

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




