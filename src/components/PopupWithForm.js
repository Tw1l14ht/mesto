import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this.handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._saveBtn = this._popup.querySelector('.popup__button-save');
    }

    _getInputValue() {
        this._inpValue = {};
        this._inputs.forEach(input => {
            return this._inpValue[input.id] = input.value;
        })

        return this._inpValue
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._saveBtn.textContent = 'Сохранение';
            this.handleFormSubmit(this._getInputValue(), this);
        })
    }

    close() {
        super.close();
        this._formElement.reset();
    }

}