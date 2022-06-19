export class Card {
  constructor(item, cardSelector, handleCardClick, deleteCardHendler, userId, addlikeCardHandler, removelikeCardHandler) {
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
    this._numberOfLikes = item.likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardHendler = deleteCardHendler;
    this._owner = item.owner._id;
    this._userId = userId;
    this._likes = item.likes;
    this._addlikeCardHandler = addlikeCardHandler;
    this._removelikeCardHandler = removelikeCardHandler;
  }

  _getId() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._delButton.addEventListener('click', () => {
      this._deleteCardHendler(this._getId());
    });
    this._likeButton.addEventListener('click', () => {
      this.checkLikeCard();
    });
    this._element.querySelector('.element__image-btn').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  renderCard() {
    this._element = this._getTemplate();
    this._delButton = this._element.querySelector('.element__delete-urn');
    this._likeButton = this._element.querySelector('.element__like');
    if (this._owner === this._userId) {
      this._delButton.classList.add('element__delete-urn_active');
    }
    this.likesCards(this._likes);
    this._setEventListeners();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this.setNumberOfLikes(this._numberOfLikes);
    return this._element;
  }

  setNumberOfLikes(numberOfLikes) {
    this._element.querySelector('.element__count-likes').textContent = numberOfLikes;
  }

  removeCard() {
    this._element.remove();
  }

  addLikeCard() {
    this._likeButton.classList.add('element__like_active');
  }

  removeLikeCard() {
    this._likeButton.classList.remove('element__like_active');
  }
  // all likes for start to get color
  likesCards(likes) {
    likes.forEach(like => {
      if (like._id === this._userId) {
        this.addLikeCard();
      } else {
        this.removeLikeCard();
      }
    })
  }

  // after click on like button check id user withi id on card to color this
  checkLikeCard() {
    const even = (elem) => elem._id === this._userId;
    if (this._likes.some(even)) {
      console.log('_removelikeCardHandler');
      this._removelikeCardHandler(this._getId());
    } else {
      console.log('_addlikeCardHandler');
      this._addlikeCardHandler(this._getId());
    }
  }
}