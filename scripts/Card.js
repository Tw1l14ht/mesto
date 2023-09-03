export class Card {
    constructor(date, openImage, templateSelector) {
        this._name = date.name;
        this._link = date.link;
        this._openImage = openImage;
        this._template = templateSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector('.card').cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.card__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._image.addEventListener('click', () => {
            this._openImage(this._title, this._link);
        });

        this._btnLike = this._element.querySelector('.card__btn-like');
        this._btnLike.addEventListener('click', () => {
            this._handleLikeClick()});
        
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._removeCard()});
    }

    _handleLikeClick() {
        this._btnLike.classList.toggle("card__btn-like_active");
    }

    _removeCard() {
        this._element.remove();
    }

}