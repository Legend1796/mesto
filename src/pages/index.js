import '../pages/index.css';
import { Card } from "../components/Card.js";
import { initialCards } from '../components/initialCards.js';
import { FormValidator, params } from '../components/FormValidator.js';
import { Popup } from '../components/Popup';
import { Section } from '../components/Section';
import { UserInfo } from '../components/UserInfo';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';

const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const newSpaceElement = document.querySelector('.popup_new-space');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const cardList = document.querySelector('.elements');
const fullSizeImage = document.querySelector('.popup_full-size');

popup.forEach((popupSelector) => {
  const popup = new Popup(popupSelector);
  popup.setEventListeners();
});

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, (name, link) => {
      const popupWithImage = new PopupWithImage(fullSizeImage);
      popupWithImage.openPopup(name, link);
    });
    section.addtItem(card.renderCard());
  }
}, cardList);
section.renderItems();

document.querySelector('.profile__add-btn').addEventListener('click', () => {
  const popupWithForm = new PopupWithForm(newSpaceElement, (newCardData) => {
    const card = new Card(newCardData, (name, link) => {
      const popupWithImage = new PopupWithImage(fullSizeImage);
      popupWithImage.openPopup(name, link);
    });
    cardList.prepend(card.renderCard());
  });
  popupWithForm.setEventListeners();
  const buttonElement = newSpaceElement.querySelector('.popup__save-btn');
  buttonElement.classList.add('popup__save-btn_disabled');
  buttonElement.setAttribute('disabled', true);
  const popup = new Popup(newSpaceElement);
  popup.openPopup();
});

document.querySelector('.profile__edit-btn').addEventListener('click', () => {
  const userInfo = new UserInfo(userName, userJob);
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  const popupWithForm = new PopupWithForm(popupProfile, ({ name, about }) => {
    userName.textContent = name;
    userJob.textContent = about;
  });
  popupWithForm.setEventListeners();
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
});