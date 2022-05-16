export { Card };
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


//Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение

class Card {
  //принимает в конструктор её данные и селектор её template-элемента;
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }
  _getTemplate() {
    const cardElement = document.querySelector('.elem').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  _setEventListeners() {
    this._element.querySelector('.element__image-btn').addEventListener('click', showCard);
    this._element.querySelector('.element__delete-urn').addEventListener('click', deleteCard);
    this._element.querySelector('.element__like').addEventListener('click', likeCard);
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


// Создадим экземпляр карточек
initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.renderCard();
  document.querySelector('.elements').append(cardElement);
});

// cardElement.querySelector('.element__image-btn').addEventListener('click', showCard);
// cardElement.querySelector('.element__delete-urn').addEventListener('click', deleteCard);
// cardElement.querySelector('.element__like').addEventListener('click', likeCard);
