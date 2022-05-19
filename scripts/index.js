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
const forms = document.querySelectorAll('.popup__form');

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
  profileFormValidate.resetErrors();
  profileFormValidate.unblockButton();
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
  cardFormValidate.blockButton();
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

const profileFormValidate = new FormValidator(params, document.querySelector('.popup__form_profile'));
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(params, document.querySelector('.popup__form_card'));
cardFormValidate.enableValidation();