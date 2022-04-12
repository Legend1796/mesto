const popupElement = document.querySelector('.popup');
const newSpaceElement = document.querySelector('.popup_newSpace');
const nameInput = popupElement.querySelector('.popup__input_type_name');
const jobInput = popupElement.querySelector('.popup__input_type_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const cardNameInput = document.querySelector('.popup__input_type_nameSpace');
const cardLinkInput = document.querySelector('.popup__input_type_linkSpace');
const cardList = document.querySelector('.elements');
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

// Сохранение изменений профиля

popupElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
});

// Открытие попапа

function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

document.querySelector('.profile__edit-btn').addEventListener('click', openPopup);

// Закрытие попапа

function closePopup() {
  popupElement.classList.remove('popup_opened')
}

document.querySelector('.popup__close').addEventListener('click', closePopup);

// Закрытия попапа просмотра карточки

function closePopupCard() {
  fullSizeImage.classList.remove('fullSize_opened')
}

document.querySelector('.fullSize__close').addEventListener('click', closePopupCard);

// Закрытие окна добавления места

function closeNewSpace() {
  newSpaceElement.classList.remove('popup_opened');
}

document.querySelector('.popup__close_newSpace').addEventListener('click', closeNewSpace);

// Открытие окна добавления места

document.querySelector('.profile__add-btn').addEventListener('click', function () {
  newSpaceElement.classList.add('popup_opened');
});

// Функция добавления карточек из массива

renderCards();
function renderCards() {
  initialCards.forEach(function (elem) {
    const cardName = elem.name;
    const cardLink = elem.link;
    addCard(cardName, cardLink);
  })
}
//Добавляем карточку вручную
function addOneCard(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  addCard(cardName, cardLink);
};

// Добавление карточек

function addCard(cardName, cardLink) {
  const elementsTemplate = document.querySelector('.elem').content;
  const cardElement = elementsTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = cardLink;
  cardElement.querySelector('.element__title').textContent = cardName;
  cardElement.querySelector('.element__image-btn').addEventListener('click', function () {
    fullSizeImage.classList.add('fullSize_opened');
    fullSizeImage.querySelector('.fullSize__image').src = cardLink;
    fullSizeImage.querySelector('.fullSize__image').alt = cardName;
    fullSizeImage.querySelector('.fullSize__title').textContent = cardName;
  });
  cardElement.querySelector('.element__delete-urn').addEventListener('click', deleteCard);
  cardElement.querySelector('.element__like').addEventListener('click', likeCard);
  if (cardNameInput.value != '') {
    cardList.prepend(cardElement);
    cardNameInput.value = '';//вот тут на метод "reset" движок почему-то ругался на меня (говорит, что это не функция) 
    cardLinkInput.value = '';//однако мне интересно это реализовать, можно еще подсказку?)))
    closeNewSpace();
  }
  else {
    cardList.append(cardElement);
  }
}

newSpaceElement.addEventListener('submit', addOneCard);
// Лайк этой карточке

function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
}

// Удаляем карточку

function deleteCard(evt) {
  const cardForDelete = evt.target.closest('.element');
  cardForDelete.remove();
}