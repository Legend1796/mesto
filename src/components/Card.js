export class Card {
  constructor(item, cardSelector, handleCardClick, deleteCardHendler, userId, addlikeCardHandler, removelikeCardHandler) {
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
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
    this._setEventListeners();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this.setNumberOfLikes(this._likes);
    return this._element;
  }

  setNumberOfLikes(likes) {
    this._likes = likes;
    this._element.querySelector('.element__count-likes').textContent = likes.length;
    this.likesCards(likes);
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

  isLiked() {
    return this._likes.some((like) => like._id === this._userId)
  }

  likesCards() {
    if (this.isLiked()) {
      this.addLikeCard();
    } else {
      this.removeLikeCard();
    }
  }

  checkLikeCard() {
    const even = (elem) => elem._id === this._userId;
    if (this._likes.some(even)) {
      this._removelikeCardHandler(this._getId());
    } else {
      this._addlikeCardHandler(this._getId());
    }
  }
}