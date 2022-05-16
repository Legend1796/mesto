// импорт классов Card и FormValidator
import { Card } from './Card.js';
// import { FormValidator } from './FormValidator.js';

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

// Функция закрытия попапа по нажатию на Escape

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

// Закрытие попапов по клику на оверлэй и на кнопку крестика

popup.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if ((evt.target.className === 'popup__overlay') || (evt.target.className === 'popup__close')) {
      closePopup(popup);
    }
  });
});

// Открытие попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

// Закрытие попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Открытие попапа профиля

document.querySelector('.profile__edit-btn').addEventListener('click', addTextFromProfile);

// Функция добавления инпутам текста из профиля + разблокировка кнопки сохранения + очистка ошибок

function addTextFromProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  const buttonElement = popupProfile.querySelector('.popup__save-btn');
  buttonElement.classList.remove('popup__save-btn_disabled');
  buttonElement.removeAttribute('disabled');
  const formElement = document.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement);
  });
  openPopup(popupProfile);
}

// Сохранение изменений профиля

popupProfile.addEventListener('submit', saveChangesProfile);

// Функция сохранения изменений профиля

function saveChangesProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

// Открытие попапа места

document.querySelector('.profile__add-btn').addEventListener('click', function () {
  openPopup(newSpaceElement);
});

// Добавление нового места

newSpaceElement.addEventListener('submit', handleAddCardFormSubmit);

// Открытие попапа карточки

function showCard(evt) {
  const cardElementFull = evt.target.closest('.element');
  const cardLinkFull = cardElementFull.querySelector('.element__image').src;
  const cardNameFull = cardElementFull.querySelector('.element__title').textContent;
  fullSizeImage.querySelector('.popup__image').src = cardLinkFull;
  fullSizeImage.querySelector('.popup__image').alt = cardNameFull;
  fullSizeImage.querySelector('.popup__title').textContent = cardNameFull;
  openPopup(fullSizeImage);
}

// Функция добавления карточек из массива

// renderCards();
// function renderCards() {
//   initialCards.forEach(function (elem) {
//     const cardName = elem.name;
//     const cardLink = elem.link;
//     const cardElement = createCard(cardName, cardLink);
//     cardList.append(cardElement)
//   })
// }

//Добавляем карточку вручную + делаем кнопку сохранения неактивной

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  document.forms.mesto.reset();
  const cardElement = createCard(cardName, cardLink);
  cardList.prepend(cardElement)
  const buttonElement = newSpaceElement.querySelector('.popup__save-btn');
  buttonElement.classList.add('popup__save-btn_disabled');
  buttonElement.setAttribute('disabled', true);
  closePopup(newSpaceElement);
};

// Добавление карточек

// function createCard(cardName, cardLink) {
// const elementsTemplate = document.querySelector('.elem').content;
// const cardElement = elementsTemplate.cloneNode(true);
// cardElement.querySelector('.element__image').src = cardLink;
// cardElement.querySelector('.element__image').alt = cardName;
// cardElement.querySelector('.element__title').textContent = cardName;
// cardElement.querySelector('.element__image-btn').addEventListener('click', showCard);
// cardElement.querySelector('.element__delete-urn').addEventListener('click', deleteCard);
// cardElement.querySelector('.element__like').addEventListener('click', likeCard);
//   return cardElement;
// }

// Лайк этой карточке

function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
}

// Удаляем карточку

function deleteCard(evt) {
  const cardForDelete = evt.target.closest('.element');
  cardForDelete.remove();
}