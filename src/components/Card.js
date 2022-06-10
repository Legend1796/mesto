// import { openPopup } from '../pages/index.js';

export class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._hahandleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-urn').addEventListener('click', () => this._element.remove());
    this._element.querySelector('.element__like').addEventListener('click', toggleLikeCard);
    this._element.querySelector('.element__image-btn').addEventListener('click', () => {
      this._hahandleCardClick(this._name, this._link);
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