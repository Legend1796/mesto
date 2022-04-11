let formElement = document.querySelector('.popup');
let newSpaceElement = document.querySelector('.newSpace');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let userName = document.querySelector('.profile__name');
let about = document.querySelector('.profile__job');
let cardNameInput = document.querySelector('.newSpace__input_type_name');
let cardLinkInput = document.querySelector('.newSpace__input_type_link');
const elementsList = document.querySelector('.elements');
const fullSizeImage = document.querySelector('.fullSize');
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

document.querySelector('.popup__close').addEventListener('click', closePopup);

// Закрытия попапа просмотра карточки

function closePopupCard() {
  fullSizeImage.classList.remove('fullSize_opened')
}

document.querySelector('.fullSize__close').addEventListener('click', closePopupCard);

// Закрытие окна добавления места

function closeNewSpace() {
  newSpaceElement.classList.remove('newSpace_opened');
}

document.querySelector('.newSpace__close').addEventListener('click', closeNewSpace);

// Открытие окна добавления места

document.querySelector('.profile__add-btn').addEventListener('click', function () {
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

    // Попап для карточки
    cardElement.querySelector('.element__image-btn').addEventListener('click', function () {
      fullSizeImage.classList.add('fullSize_opened');
      fullSizeImage.querySelector('.fullSize__image').src = elem.link;
      fullSizeImage.querySelector('.fullSize__title').textContent = elem.name;
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

/* 
Добавляем карточку (конечно можно было бы добавлять и удалять карточки через массив, 
и потом обновлять информацию на странице...
Однако наставники указали на тот путь решения задачи, который представлен сейчас)
*/

newSpaceElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const elementsTemplate = document.querySelector('.elem').content;
  const cardElement = elementsTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = cardLink;
  cardElement.querySelector('.element__title').textContent = cardName;
  const buttonDeletCard1 = cardElement.querySelector('.element__delete-urn');
  const buttonDeletCard2 = cardElement.querySelector('.element__delete-cap');
  buttonDeletCard1.addEventListener('click', deleteCard);
  buttonDeletCard2.addEventListener('click', deleteCard);
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  // Попап для карточки, добавленной вручную
  cardElement.querySelector('.element__image-btn').addEventListener('click', function () {
    const fullSizeImage = document.querySelector('.fullSize')
    fullSizeImage.classList.add('fullSize_opened');
    fullSizeImage.querySelector('.fullSize__image').src = cardLink;
    fullSizeImage.querySelector('.fullSize__title').textContent = cardName;
  });
  elementsList.prepend(cardElement);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closeNewSpace();
});

// Удаляем карточку

function deleteCard(evt) {
  const ardForDel = evt.target.closest('.element');
  ardForDel.remove();
}