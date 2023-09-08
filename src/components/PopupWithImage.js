import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector('.popup__card-image');
        this._describe = this._popup.querySelector('.popup__describe');
    }

    open(title, src) {
        this._image.src = src;
        this._image.alt = title;
        this._describe.textContent = title;
        super.open();
    }
}