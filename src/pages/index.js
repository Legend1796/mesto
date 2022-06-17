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

const section = new Section({
  renderer: (item) => {
    section.addtItem(createCard(item));
  }
}, '.elements');

const popupWithFormDeleteCard = new PopupWithForm('.popup_delete-card', (cardId) => {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCard();
    })
    .catch((err) => {
      console.log('popupWithFormDeleteCard:', err);
    })
}, '.popup__form');
popupWithFormDeleteCard.setEventListeners();

const popupWithFormeditAvatar = new PopupWithForm('.popup_edit-avatar', (linkAvatar) => {
  api.setAvatar(linkAvatar)
    .then(() => {
      getUserInfoFromServer();
    })
    .catch((err) => {
      console.log('popupWithFormeditAvatar:', err);
    })
}, '.popup__form');
popupWithFormeditAvatar.setEventListeners();

const popupWithFormCard = new PopupWithForm('.popup_new-space', (newCardData) => {
  api.setInitialCards(newCardData)
    .then(() => {
      const container = document.querySelector('.elements');
      newCardData.likes = Array(0);
      container.prepend(createCard(newCardData));
    })
    .catch((err) => {
      console.log('popupWithFormCard:', err);
    })
}, '.popup__form');
popupWithFormCard.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup_profile', (newUserData) => {
  api.setUserInfo(newUserData)
    .then(() => {
      getUserInfoFromServer();
    })
    .catch((err) => {
      console.log('popupWithFormProfile:', err);
    })

}, '.popup__form');
popupWithFormProfile.setEventListeners();

const profileFormValidate = new FormValidator(params, document.querySelector('.popup__form_profile'));
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(params, document.querySelector('.popup__form_card'));
cardFormValidate.enableValidation();

const avatarFormValidate = new FormValidator(params, document.querySelector('.popup__form_avatar'));
avatarFormValidate.enableValidation();

function createCard(item) {
  // console.log(item);
  const card = new Card(item, '.elem', (name, link) => {
    popupWithImage.openPopup(name, link);
  }, () => popupWithFormDeleteCard.openPopup());
  return card.renderCard();
}

function getCardsFromServer() {
  api.getInitialCards()
    .then(cards => {
      section.renderItems(cards);
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

document.querySelector('.profile__edit-avatar').addEventListener('click', () => {
  popupWithFormeditAvatar.openPopup();
})


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