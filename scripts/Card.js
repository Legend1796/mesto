import { openPopup } from './index.js';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document.querySelector('.elem').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-urn').addEventListener('click', (evt) => evt.target.closest('.element').remove());
    this._element.querySelector('.element__like').addEventListener('click', (evt) => evt.target.classList.toggle('element__like_active'));
    this._element.querySelector('.element__image-btn').addEventListener('click', (evt) => {
      const fullSizeImage = document.querySelector('.popup_full-size');
      const cardElementFull = evt.target.closest('.element');
      const cardLinkFull = cardElementFull.querySelector('.element__image').src;
      const cardNameFull = cardElementFull.querySelector('.element__title').textContent;
      fullSizeImage.querySelector('.popup__image').src = cardLinkFull;
      fullSizeImage.querySelector('.popup__image').alt = cardNameFull;
      fullSizeImage.querySelector('.popup__title').textContent = cardNameFull;
      openPopup(fullSizeImage);
    });
  }

  renderCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.renderCard();
  document.querySelector('.elements').append(cardElement);
});