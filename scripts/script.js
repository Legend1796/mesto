const popupElement = document.querySelector('.popup_profile');
const newSpaceElement = document.querySelector('.popup_new-space');
const nameInput = popupElement.querySelector('.popup__input_type_name');
const jobInput = popupElement.querySelector('.popup__input_type_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const cardNameInput = document.querySelector('.popup__input_type_name-space');
const cardLinkInput = document.querySelector('.popup__input_type_link-space');
const cardList = document.querySelector('.elements');
const fullSizeImage = document.querySelector('.popup_full-size');

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

// Открытие попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрытие попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

// Открытие попапа профиля

document.querySelector('.profile__edit-btn').addEventListener('click', function () {
  const popup = popupElement;
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popup);
});

// Закрытие попапа профиля

document.querySelector('.popup__close').addEventListener('click', function () {
  const popup = popupElement;
  closePopup(popup);
});

// Сохранение изменений профиля

popupElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  const popup = popupElement;
  closePopup(popup);
});

// Открытие попапа места

document.querySelector('.profile__add-btn').addEventListener('click', function () {
  const popup = newSpaceElement;
  openPopup(popup);
});

// Закрытие попапа места

document.querySelector('.popup__close_new-space').addEventListener('click', function () {
  const popup = newSpaceElement;
  closePopup(popup);
});

// Добавление нового места

newSpaceElement.addEventListener('submit', formAddOneCardHandler);

// Открытие попапа карточки

function cardShow(evt) {
  cardElementFull = evt.target.closest('.element');
  const cardLinkFull = cardElementFull.querySelector('.element__image').src;
  const cardNameFull = cardElementFull.querySelector('.element__title').textContent;
  fullSizeImage.querySelector('.popup__image').src = cardLinkFull;
  fullSizeImage.querySelector('.popup__image').alt = cardNameFull;
  fullSizeImage.querySelector('.popup__title').textContent = cardNameFull;
  const popup = fullSizeImage;
  openPopup(popup);
}

// Закрытия попапа карточки

document.querySelector('.popup__close_full-size').addEventListener('click', function () {
  const popup = fullSizeImage;
  closePopup(popup);
});

// Функция добавления карточек из массива

renderCards();
function renderCards() {
  initialCards.forEach(function (elem) {
    const cardName = elem.name;
    const cardLink = elem.link;
    const elementsTemplate = document.querySelector('.elem').content;
    const cardElement = elementsTemplate.cloneNode(true);
    addCard(cardName, cardLink, cardElement);
    cardList.append(cardElement);
  })
}

//Добавляем карточку вручную

function formAddOneCardHandler(evt) {
  evt.preventDefault();
  const elementsTemplate = document.querySelector('.elem').content;
  const cardElement = elementsTemplate.cloneNode(true);
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  addCard(cardName, cardLink, cardElement);
  document.querySelector('.popup__form').reset(); // О, получилось! Пушка! Спасибо, прям код красивее стал!
  //cardNameInput.value = ''; 
  //cardLinkInput.value = '';
  cardList.prepend(cardElement);
  const popup = newSpaceElement;
  closePopup(popup);
};

// Добавление карточек

function addCard(cardName, cardLink, cardElement) {
  cardElement.querySelector('.element__image').src = cardLink;
  cardElement.querySelector('.element__image').alt = cardName;
  cardElement.querySelector('.element__title').textContent = cardName;
  cardElement.querySelector('.element__image-btn').addEventListener('click', cardShow);
  cardElement.querySelector('.element__delete-urn').addEventListener('click', deleteCard);
  cardElement.querySelector('.element__like').addEventListener('click', likeCard);
  return cardElement;
}

// Лайк этой карточке

function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
}

// Удаляем карточку

function deleteCard(evt) {
  const cardForDelete = evt.target.closest('.element');
  cardForDelete.remove();
}