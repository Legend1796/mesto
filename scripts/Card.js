// Массив с карточками
const initialCards = [
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

class Card {
  constructor(namePlace, linkPlace) {
    this._name = namePlace;
    this._link = linkPlace;
  }
  _getTemplate() {
    const cardElement = document.querySelector('.elem').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  renderCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}


// Создадим экземпляр карточек

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.renderCard();
  document.querySelector('.elements').append(cardElement);
});

// cardElement.querySelector('.element__image-btn').addEventListener('click', showCard);
// cardElement.querySelector('.element__delete-urn').addEventListener('click', deleteCard);
// cardElement.querySelector('.element__like').addEventListener('click', likeCard);
