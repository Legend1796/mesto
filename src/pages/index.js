import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from "../utils/initialCards.js";
import { params } from "../utils/params.js";
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo';
import { PopupWithForm } from '../components/popupwithform';
import { PopupWithImage } from '../components/popupwithimage';

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');

const popupWithImage = new PopupWithImage('.popup_full-size');
const userProfile = new UserInfo('.profile__name', '.profile__job');

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addtItem(createCard(item).renderCard());
  }
}, '.elements');
section.renderItems();

const popupWithFormCard = new PopupWithForm('.popup_new-space', (newCardData) => {
  section.addtItemNewCard(createCard(newCardData).renderCard());
});
popupWithFormCard.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup_profile', (newUserData) => {
  userProfile.setUserInfo(newUserData);
});
popupWithFormProfile.setEventListeners();

const profileFormValidate = new FormValidator(params, document.querySelector('.popup__form_profile'));
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(params, document.querySelector('.popup__form_card'));
cardFormValidate.enableValidation();

function createCard(item) {
  const card = new Card(item, '.elem', (name, link) => {
    popupWithImage.openPopup(name, link);
  });
  return card;
}

document.querySelector('.profile__edit-btn').addEventListener('click', () => {
  const userData = userProfile.getUserInfo();
  popupInputName.value = userData.name;
  popupInputJob.value = userData.job;
  profileFormValidate.resetErrors();
  profileFormValidate.unblockButton();
  popupWithFormProfile.openPopup();
});

document.querySelector('.profile__add-btn').addEventListener('click', () => {
  cardFormValidate.resetErrors();
  cardFormValidate.blockButton();
  popupWithFormCard.openPopup();
});