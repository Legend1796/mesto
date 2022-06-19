import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from '../components/FormValidator.js';
import { params } from "../utils/params.js";
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo';
import { PopupWithForm } from '../components/popupwithform';
import { PopupWithImage } from '../components/popupwithimage';
import { Api } from '../components/Api';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const userProfile = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
const popupWithImage = new PopupWithImage('.popup_full-size');
popupWithImage.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: 'f14e4888-1d0c-41bb-80a1-fc5f4ce8b4db',
    'Content-Type': 'application/json'
  }
});

const section = new Section({
  renderer: (item) => {
    section.addtItem(createCard(item, userProfile.getUserId()));
  }
}, '.elements');

const popupWithConfirmation = new PopupWithConfirmation('.popup_delete-card');
popupWithConfirmation.setEventListeners();

const popupWithFormeditAvatar = new PopupWithForm('.popup_edit-avatar', (linkAvatar) => {
  popupWithFormeditAvatar.renderButtonText('Сохранение...');
  api.setAvatar(linkAvatar)
    .then((res) => {
      userProfile.setUserInfo(res);
      popupWithFormeditAvatar.closePopup();
    })
    .catch((err) => {
      console.log('popupWithFormeditAvatar:', err);
    })
    .finally(() => {
      setTimeout(popupWithFormeditAvatar.renderButtonText('Сохранить'), 2000);
    })
}, '.popup__form');
popupWithFormeditAvatar.setEventListeners();

const popupWithFormCard = new PopupWithForm('.popup_new-space', (newCardData) => {
  popupWithFormCard.renderButtonText('Сохранение...');
  api.setInitialCards(newCardData)
    .then((res) => {
      console.log(res);
      console.log(userProfile.getUserId());
      section.addtItemNewCard(createCard(res, userProfile.getUserId()));
      popupWithFormCard.closePopup();
    })
    .catch((err) => {
      console.log('popupWithFormCard:', err);
    })
    .finally(() => {
      setTimeout(popupWithFormCard.renderButtonText('Создать'), 2000);
    })
}, '.popup__form');
popupWithFormCard.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup_profile', (newUserData) => {
  popupWithFormProfile.renderButtonText('Сохранение...');
  api.setUserInfo(newUserData)
    .then((res) => {
      userProfile.setUserInfo(res);
      popupWithFormProfile.closePopup();
    })
    .catch((err) => {
      console.log('popupWithFormProfile:', err);
    })
    .finally(() => {
      setTimeout(popupWithFormProfile.renderButtonText('Сохранить'), 2000);
    })

}, '.popup__form');
popupWithFormProfile.setEventListeners();

function createCard(item, userId) {
  const card = new Card(item, '.elem', (name, link) => {
    popupWithImage.openPopup(name, link);
  }, (cardId) => {
    popupWithConfirmation.openPopup();
    popupWithConfirmation.getCardIdForDelete(() => {
      api.deleteCard(cardId)
        .then(() => {
          card.removeCard(cardId);
          popupWithConfirmation.closePopup();
        })
        .catch((err) => {
          console.log('popupWithFormDeleteCard:', err);
        })
    });
  }, userId, (cardId, likes, userId) => {

    const allLikes = [];
    likes.forEach(like => {
      allLikes.push(like._id);
    })
    const even = (elem) => elem === userId;
    if (allLikes.some(even)) {
      api.removeLike(cardId)
        .then((res) => {
          card.setNumberOfLikes(res.likes.length);
          card.likesCards();
          // card.removeLikeCard();
        })
        .catch((err) => {
          console.log('addLikeCard:', err);
        })
    } else {
      api.addLike(cardId)
        .then((res) => {
          console.log(res);
          card.setNumberOfLikes(res.likes.length);
          card.likesCards();
          // card.addLikeCard();
        })
        .catch((err) => {
          console.log('addLikeCard:', err);
        })
    }
  });
  return card.renderCard();
}

function getCardsFromServer() {
  api.getInitialCards()
    .then((cards) => {
      section.renderItems(cards);
    })
    .catch((err) => {
      console.log('getCardsFromServer:', err);
    })
}

function getUserInfoFromServer() {
  api.getUserInfo()
    .then(info => {
      userProfile.setUserInfo(info);
      getCardsFromServer();
    })
    .catch((err) => {
      alert(err);
    })
}
getUserInfoFromServer();

document.querySelector('.profile__edit-avatar').addEventListener('click', () => {
  popupWithFormeditAvatar.openPopup();
})


document.querySelector('.profile__edit-btn').addEventListener('click', () => {
  const userData = userProfile.getUserInfo();
  popupInputName.value = userData.name;
  popupInputJob.value = userData.job;
  profileFormValidate.resetErrors();
  profileFormValidate.unblockButton();
  popupWithFormProfile.openPopup();
});

document.querySelector('.profile__add-btn').addEventListener('click', () => {
  cardFormValidate.resetErrors();
  cardFormValidate.blockButton();
  popupWithFormCard.openPopup();
});

const profileFormValidate = new FormValidator(params, document.querySelector('.popup__form_profile'));
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(params, document.querySelector('.popup__form_card'));
cardFormValidate.enableValidation();

const avatarFormValidate = new FormValidator(params, document.querySelector('.popup__form_avatar'));
avatarFormValidate.enableValidation();