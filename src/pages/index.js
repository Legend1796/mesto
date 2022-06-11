import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from "../utils/initialCards.js";
import { params } from "../utils/params.js";
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo';
import { PopupWithForm } from '../components/popupwithform';
import { PopupWithImage } from '../components/popupwithimage';

const popupProfile = document.querySelector('.popup_profile');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');

const popupWithImage = new PopupWithImage('.popup_full-size');
const userProfile = new UserInfo('.profile__name', '.profile__job');
const userData = userProfile.getUserInfo();


function createCard(item) {
  const card = new Card(item, '.elem', (name, link) => {
    popupWithImage.openPopup(name, link);
  });
  return card;
}

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addtItem(createCard(item).renderCard());
  }
}, '.elements');
section.renderItems();

document.querySelector('.profile__edit-btn').addEventListener('click', addTextFromProfile);

function addTextFromProfile() {
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profileFormValidate.resetErrors();
  profileFormValidate.unblockButton();
  popupWithFormProfile.openPopup();
}

document.querySelector('.profile__add-btn').addEventListener('click', () => {
  cardFormValidate.resetErrors();
  cardFormValidate.blockButton();
  popupWithFormCard.openPopup();
});

const popupWithFormCard = new PopupWithForm('.popup_new-space', (newCardData) => {
  section.addtItemNewCard(createCard(newCardData).renderCard());
});
popupWithFormCard.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup_profile', ({ name, about }) => {
  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__job').textContent = about;
});
popupWithFormProfile.setEventListeners();

const profileFormValidate = new FormValidator(params, document.querySelector('.popup__form_profile'));
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(params, document.querySelector('.popup__form_card'));
cardFormValidate.enableValidation();