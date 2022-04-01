let profileEditButton = document.querySelector('.profile__edit-btn');
let formElement = document.querySelector('.popup');
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

function openPopup() {
  nameInput.value = userName.textContent;
  jobInput.value = about.textContent;
  formElement.classList.add('popup_opened')
}

function closePopup() {
  formElement.classList.remove('popup_opened')
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);