import { Card } from './Card.js';
import {initialCards} from './cards.js';
import { FormValidator } from './FormValidator.js';

const popupList = document.querySelectorAll('.popup');
const btnEdit = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector("#popup__profile");
const popupPlace = document.querySelector("#popup__place");
const popupImage = document.querySelector("#popup__image")
const nameInput = document.querySelector(".popup__input_date_name");
const jobInput = document.querySelector(".popup__input_date_describe");
const imgNameInp = document.querySelector(".popup__input_date_place");
const imgSrcInp = document.querySelector(".popup__input_date_src");
const firstName = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const btnAddPlace = document.querySelector(".profile__add-button");
const btnCloseProf = document.querySelector('#profile__close');
const btnClosePlace = document.querySelector('#place__close');
const formElementProf = document.querySelector('[name="popupEditProf"]');
const formElementPlace = document.querySelector('[name="popupAddPlace"]');
const popupCardImg = document.querySelector('.popup__card-image');
const popupCardDescribe = document.querySelector('.popup__describe');
const popupImgClose= document.querySelector('.popup__close_place_card');
const popupImg = document.querySelector('#popup__image');
const cardsContainer = document.querySelector('.cards');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  }

initialCards.forEach((i) => {
    const cardElement = createCard(i);
    addCard(cardElement, cardsContainer);
});

popupList.forEach((item) => item.addEventListener('mousedown', function(evt){
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}))

function addCard(card, spot) {
    spot.prepend(card);
}

function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function openImage(cardName, src){
    openPopup(popupImage);
    popupCardImg.src = src;
    popupCardImg.alt = cardName;
    popupCardDescribe.textContent = cardName;

}

function createCard(obj){
    const card = new Card(obj, openImage, '.card-template')
    const cardcomplited = card.generateCard();

    return cardcomplited;
}


function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    firstName.textContent = nameValue;
    description.textContent = jobValue;
    validProfForm.disableButton();
    closePopup(popupProfile);
}
 
function handleCardFormSubmit (evt) {
    evt.preventDefault(); 
    const cardObj= {
        name: imgNameInp.value, 
        link: imgSrcInp.value};
    const newCard = createCard(cardObj);
    addCard(newCard, cardsContainer);
    formElementPlace.reset();
    validPlaceForm.disableButton();
    closePopup(popupPlace);
}; 

function closePopupEsc(evt){
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    }
}

function fillProfValue(){
    nameInput.value = firstName.textContent;
    jobInput.value = description.textContent;
}


formElementPlace.addEventListener('submit', handleCardFormSubmit);
formElementProf.addEventListener('submit', handleProfileFormSubmit); 

btnCloseProf.addEventListener('click', () => {
    closePopup(popupProfile);
});

btnClosePlace.addEventListener('click', () => {
    closePopup(popupPlace);
});

btnEdit.addEventListener('click', (e) => {
    openPopup(popupProfile);
    fillProfValue();
    validProfForm.removeInputErrors();
    validProfForm.enableButton();
});

btnAddPlace.addEventListener('click', (e) => {
    openPopup(popupPlace);
    formElementPlace.reset();
    validPlaceForm.removeInputErrors();
});
popupImgClose.addEventListener('click', () => {
    closePopup(popupImg);
});

const validPlaceForm = new FormValidator(formElementPlace, validationConfig);
validPlaceForm.enableValidation();
const validProfForm = new FormValidator(formElementProf, validationConfig);
validProfForm.enableValidation();