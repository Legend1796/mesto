import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from '../components/FormValidator.js';
import { params } from "../utils/params.js";
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo';
import { PopupWithForm } from '../components/popupwithform';
import { PopupWithImage } from '../components/popupwithimage';
import { Api } from '../components/Api';

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const userProfile = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
const popupWithImage = new PopupWithImage('.popup_full-size');
popupWithImage.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: 'f14e4888-1d0c-41bb-80a1-fc5f4ce8b4db',
    'Content-Type': 'application/json'
  }
});

function getCardsFromServer() {
  api.getInitialCards()
    .then(cards => {
      const section = new Section({
        items: cards,
        renderer: (item) => {
          section.addtItem(createCard(item));
        }
      }, '.elements');
      section.renderItems();
    })
    .catch((err) => {
      alert(err);
    })
}
getCardsFromServer();

function getUserInfoFromServer() {
  api.getUserInfo()
    .then(info => {
      userProfile.setUserInfo(info);
    })
    .catch((err) => {
      alert(err);
    })
}
getUserInfoFromServer();

const popupWithFormCard = new PopupWithForm('.popup_new-space', (newCardData) => {
  api.setInitialCards(newCardData)
    .then(() => {
      const container = document.querySelector('.elements');
      container.prepend(createCard(newCardData));
    })
    .catch((err) => {
      alert(err);
    })

}, '.popup__form');
popupWithFormCard.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup_profile', (newUserData) => {
  api.setUserInfo(newUserData)
    .then(() => {
      getUserInfoFromServer();
    })
    .catch((err) => {
      alert(err);
    })

}, '.popup__form');
popupWithFormProfile.setEventListeners();

const profileFormValidate = new FormValidator(params, document.querySelector('.popup__form_profile'));
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(params, document.querySelector('.popup__form_card'));
cardFormValidate.enableValidation();

function createCard(item) {
  const card = new Card(item, '.elem', (name, link) => {
    popupWithImage.openPopup(name, link);
  });
  return card.renderCard();
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