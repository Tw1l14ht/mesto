export default class FormValidator {
    constructor(formElement, validationConfig){
        this._formEl = formElement;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass - validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);
    }

    _setEventListeners() {

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleBtnState();
        });
    });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _showInputError(inputElement, inputValidMessage) {
        this._errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = inputValidMessage;
        this._errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        this._errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    }
    
    _toggleBtnState() {
        if (this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this.enableButton();
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          });
    }

    disableButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    enableButton(){
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    removeInputErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}