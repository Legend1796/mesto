//let profileEditButton = document.querySelector('.profile__edit-btn');
let formElement = document.querySelector('.popup');
let newSpaceElement = document.querySelector('.newSpace');
let newSpaceCloseButton = document.querySelector('.newSpace__close');
let addSpaceButton = document.querySelector('.profile__add-btn');
let createSpaceButton = document.querySelector('.newSpace__create-btn');
let popupCloseButton = document.querySelector('.popup__close');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let userName = document.querySelector('.profile__name');
let about = document.querySelector('.profile__job');
let cardNameInput = document.querySelector('.newSpace__input_type_name');
let cardLinkInput = document.querySelector('.newSpace__input_type_link');
const elementsList = document.querySelector('.elements');

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

reloadElements();
// Сохранение изменений профиля

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  about.textContent = jobInput.value;
  closePopup();
});

// Открытие попапа

document.querySelector('.profile__edit-btn').addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = about.textContent;
  formElement.classList.add('popup_opened');
});

// Закрытие попапа

function closePopup() {
  formElement.classList.remove('popup_opened')
}

popupCloseButton.addEventListener('click', closePopup);

// Закрытие окна добавления места

function closeNewSpace() {
  newSpaceElement.classList.remove('newSpace_opened');
}

newSpaceCloseButton.addEventListener('click', closeNewSpace);

// Открытие окна добавления места

addSpaceButton.addEventListener('click', function () {
  newSpaceElement.classList.add('newSpace_opened');
});

// Функция обновления карточек

function reloadElements() {
  initialCards.forEach(function (elem) {
    const elementsTemplate = document.querySelector('.elem').content;
    const cardElement = elementsTemplate.cloneNode(true);
    // Лайк этой карточке
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
    });
    cardElement.querySelector('.element__image').src = elem.link;
    cardElement.querySelector('.element__title').textContent = elem.name;
    const buttonDeletCard1 = cardElement.querySelector('.element__delete-urn');
    const buttonDeletCard2 = cardElement.querySelector('.element__delete-cap');
    buttonDeletCard1.addEventListener('click', deleteCard);
    buttonDeletCard2.addEventListener('click', deleteCard);
    elementsList.append(cardElement)
  })
}

// Удаляем карточку

function deleteCard(evt) {
  const ardForDel = evt.target.closest('.element');
  ardForDel.remove();
}

// Добавляем карточку

newSpaceElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  initialCards.unshift({
    name: cardName,
    link: cardLink
  });
  const cards = document.querySelectorAll('.element')
  cards.forEach((item) => {
    item.remove();
  })
  reloadElements();
  closeNewSpace();
});



