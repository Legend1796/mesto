import { PopupWithImage } from "./PopupWithImage";

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
  constructor({ name, link }, handleCardClick) {
    this._name = name;
    this._link = link;
    this._hahandleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector('.elem').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-urn').addEventListener('click', (evt) => evt.target.closest('.element').remove());
    this._element.querySelector('.element__like').addEventListener('click', (evt) => evt.target.classList.toggle('element__like_active'));
    this._element.querySelector('.element__image-btn').addEventListener('click', () => {
      const fullSizeImage = document.querySelector('.popup_full-size');
      const popupWithImage = new PopupWithImage(fullSizeImage);
      popupWithImage.openPopup(this._name, this._link);
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