export default class Card {
    constructor(data, userId, handleCardClick, popupImage,  templateSelector, putLikeCard, deleteLikeCard, deleteCard) {
        this._name = data.name;
        this._userId = userId;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._template = templateSelector;
        this._popupImage = popupImage;
        this._arrOfLikes = data.likes; 
        this._countOfLikes = this._arrOfLikes.length;
        this._id = data._id;
        this._owner = data.owner._id;
        this._putLikeCard = putLikeCard;
        this._deleteLikeCard = deleteLikeCard;
        this._deleteCard = deleteCard;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector('.card').cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._conterLike = this._element.querySelector('.card__like-counter');
        this._conterLike.textContent = this._countOfLikes;
        this._image = this._element.querySelector('.card__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        this._btnLike = this._element.querySelector('.card__like-btn');
        this._trash = this._element.querySelector('.card__trash');
        this._addTrash();
        this._handleOwnLike();
        this._btnLike.addEventListener("click", () => {
            if (this._btnLike.classList.contains("card__like-btn_active")) {
              this._deleteLikeCard(this);
            } else {
                this._putLikeCard(this);
            }
          });
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
        
        this._trash.addEventListener('click', () => {
            this._deleteCard(this);
        });
    }

    putLike() {
        this._btnLike.classList.add("card__like-btn_active");
        this._conterLike.textContent =
          parseInt(this._conterLike.textContent, 10) + 1;
      }

      removeLike() {
        this._btnLike.classList.remove("card__like-btn_active");
        this._conterLike.textContent =
          parseInt(this._conterLike.textContent, 10) - 1;
      }


    _handleOwnLike(){
        this._arrOfLikes.forEach((el) => {     
            if (this._userId === el._id){
                this._btnLike.classList.add("card__like-btn_active");
            }
        });
    }

    _addTrash() {
        if(this._userId === this._owner){
            this._trash.classList.add('card__trash_type_active');
        }
    }

    getCardId() {
        return this._id;
      }

    removeCard() {
        this._element.remove();
        this._element = null;
    }

}