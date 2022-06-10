import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from "../components/initialCards.js";
import { params } from "../components/params.js";
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo';
import { Popup } from '../components/Popup';
import { PopupWithForm } from '../components/popupwithform';
import { PopupWithImage } from '../components/popupwithimage';

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
const fullSizeImage = document.querySelector('.popup_full-size');

popup.forEach((popupSelector) => {
  const popup = new Popup(popupSelector);
  popup.setEventListeners();
});

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.elem', (name, link) => {
      const popupWithImage = new PopupWithImage(fullSizeImage);
      popupWithImage.openPopup(name, link);
    });
    section.addtItem(card.renderCard());
  }
}, cardList);
section.renderItems();

document.querySelector('.profile__edit-btn').addEventListener('click', addTextFromProfile);

function addTextFromProfile() {
  const userInfo = new UserInfo(userName, userJob);
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  const popupWithForm = new PopupWithForm(popupProfile, ({ name, about }) => {
    userName.textContent = name;
    userJob.textContent = about;
  });
  profileFormValidate.resetErrors();
  profileFormValidate.unblockButton();
  popupWithForm.setEventListeners();
  const popup = new Popup(popupProfile);
  popup.openPopup();
}

document.querySelector('.profile__add-btn').addEventListener('click', addNewCard);

function addNewCard() {
  const popupWithForm = new PopupWithForm(newSpaceElement, (newCardData) => {
    console.log(newCardData);
    const card = new Card(newCardData, '.elem', (name, link) => {
      console.log(newCardData);
      const popupWithImage = new PopupWithImage(fullSizeImage);
      popupWithImage.openPopup(name, link);
    });
    cardList.prepend(card.renderCard());
  });
  popupWithForm.setEventListeners();
  const popup = new Popup(newSpaceElement);
  popup.openPopup();
}

const profileFormValidate = new FormValidator(params, document.querySelector('.popup__form_profile'));
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(params, document.querySelector('.popup__form_card'));
cardFormValidate.enableValidation();