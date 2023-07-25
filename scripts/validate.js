const showInputError = (formElement, inputElement, errorMessage, validList) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validList.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validList.errorClass);
};

const hideInputError = (formElement, inputElement, validList) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validList.inputErrorClass);
    errorElement.classList.remove(validList.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validList) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validList);
    } else {
        hideInputError(formElement, inputElement, validList);
    }
};


const setEventListeners = (formElement, validList) => {
    const inputList = Array.from(formElement.querySelectorAll(validList.inputSelector));
    const buttonElement = formElement.querySelector(validList.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validList);
            toggleBtnState(buttonElement, inputList, validList);
        });
    });
};

const enableValidation = (validList) => {
    const formList = Array.from(document.querySelectorAll(validList.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, validList);
    });
};

enableValidation(validList);

const removeInputErrors = (popup) => {
    const inputList = Array.from(popup.querySelectorAll(validList.inputSelector));

    inputList.forEach((inputElement) => {
        hideInputError(popup, inputElement, validList);
    })
}

const installDisButton = (buttonElement, validList) => {
    buttonElement.classList.add(validList.inactiveButtonClass);
    buttonElement.disabled = true;
}

const installActBtn = (buttonElement, validList) => {
    buttonElement.classList.remove(validList.inactiveButtonClass);
    buttonElement.disabled = false;
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  
function toggleBtnState(buttonElement, inputList, validList){
    if (hasInvalidInput(inputList)) {
        installDisButton(buttonElement, validList);
    } else {
        installActBtn(buttonElement, validList);
    }
};
























