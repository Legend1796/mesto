let editopen = document.querySelector('.profile__editbtn');
let formElement = document.querySelector('.popup');
let editclose = document.querySelector('.popup__close');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__about');
let username = document.querySelector('.profile__name');
let about = document.querySelector('.profile__job');
let save = formElement.querySelector('.popup__saveButton');
function addText() {
  nameInput.value = username.textContent;
  jobInput.value = about.textContent;
}
function saveChanges() {
  username.textContent = nameInput.value;
  about.textContent = jobInput.value;
  closePopup();
  username.value = '';
  about.value = '';
}
function formSubmitHandler(evt) {
  evt.preventDefault();
}
function openPopup() {
  formElement.classList.add('popup_opened')
  addText()
}
function closePopup() {
  formElement.classList.remove('popup_opened')
}
editopen.addEventListener('click', openPopup);
editclose.addEventListener('click', closePopup);
save.addEventListener('click', saveChanges);
formElement.addEventListener('submit', formSubmitHandler);