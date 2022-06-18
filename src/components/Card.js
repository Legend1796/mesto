export class Card {
  constructor(item, cardSelector, handleCardClick, deleteCardHendler, info, likeCardHandler) {
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
    this._numberOfLikes = item.likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardHendler = deleteCardHendler;
    this._likeCardHandler = likeCardHandler;
    this._owner = item.owner._id;
    this._userId = info._id;
    this._likes = item.likes;
  }

  _getId() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-urn').addEventListener('click', () => {
      this._deleteCardHendler(this._getId());
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCardHandler(this._getId(), this._likes, this._userId);
    });
    this._element.querySelector('.element__image-btn').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  renderCard() {
    this._element = this._getTemplate();
    if (this._owner === this._userId) {
      this._element.querySelector('.element__delete-urn').classList.add('element__delete-urn_active');
    }
    this._likes.forEach(like => {
      if (like._id === this._userId) {
        this.addLikeCard();
      }
    })
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
    console.log(this._element.querySelector('.element__like'));
    this._element.querySelector('.element__like').classList.add('element__like_active');
  }

  removeLikeCard() {
    console.log(this._element.querySelector('.element__like'));
    this._element.querySelector('.element__like').classList.remove('element__like_active');
  }

}