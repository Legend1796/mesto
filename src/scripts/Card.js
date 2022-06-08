import { openPopup } from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-urn').addEventListener('click', () => this._element.remove());
    this._element.querySelector('.element__like').addEventListener('click', toggleLikeCard);
    this._element.querySelector('.element__image-btn').addEventListener('click', () => {
      const fullSizeImage = document.querySelector('.popup_full-size');
      fullSizeImage.querySelector('.popup__image').src = this._link;
      fullSizeImage.querySelector('.popup__image').alt = this._name;
      fullSizeImage.querySelector('.popup__title').textContent = this._name;
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

function toggleLikeCard(evt) {
  evt.target.classList.toggle('element__like_active')
}