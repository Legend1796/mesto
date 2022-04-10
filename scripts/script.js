let profileEditButton = document.querySelector('.profile__edit-btn');
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

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  about.textContent = jobInput.value;
  closePopup();
}

function closePopup() {
  formElement.classList.remove('popup_opened')
}

function closeNewSpace() {
  newSpaceElement.classList.remove('newSpace_opened')
}

function createSpace() {
  closeNewSpace()
}

addSpaceButton.addEventListener('click', function () {
  newSpaceElement.classList.add('newSpace_opened');
});

profileEditButton.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = about.textContent;
  formElement.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', closePopup);
newSpaceCloseButton.addEventListener('click', closeNewSpace);
createSpaceButton.addEventListener('click', createSpace);
formElement.addEventListener('submit', formSubmitHandler);


const elementsList = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.element').content;
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

initialCards.forEach(function (elem) {
  const cardElement = elementsTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = elem.link;
  cardElement.querySelector('.element__title').textContent = elem.name;

  elementsList.append(cardElement)


})