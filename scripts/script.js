let editopen = document.querySelector('.profile__edit-btn');
let formElement = document.querySelector('.popup');
let editclose = document.querySelector('.popup__close');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__about');
let username = document.querySelector('.profile__name');
let about = document.querySelector('.profile__job');

function formSubmitHandler(evt) {
  evt.preventDefault();
  username.textContent = nameInput.value;
  about.textContent = jobInput.value;
  closePopup();
}

function openPopup() {
  formElement.classList.add('popup_opened')
  nameInput.value = username.textContent;
  jobInput.value = about.textContent;
}

function closePopup() {
  formElement.classList.remove('popup_opened')
}

editopen.addEventListener('click', openPopup);
editclose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);