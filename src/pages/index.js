import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
    btnEdit,
    popupProfile,
    popupPlace,
    popupImage,
    nameInput,
    jobInput,
    firstName,
    description,
    btnAddPlace,
    formElementProf,
    formElementPlace,
    validationConfig,
    initialCards
} from '../utils/constants.js'

const cardList = new Section({items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
    }
}, '.cards');

cardList.renderItems();

function openPopup(title, src){
    imgPopup.open(title, src);
}

function createCard(date){
    const card = new Card(date, openPopup, popupImage, '.card-template')
    const cardComplited = card.generateCard();

    return cardComplited;
}

function handleProfileFormSubmit (inputs) {
    profileInfo.setUserInfo(inputs);
}
 
function handleCardFormSubmit (inputs) {
    const newCard = createCard(inputs);
    cardList.addItem(newCard);
}; 

function fillProfValue(){
    nameInput.value = firstName.textContent;
    jobInput.value = description.textContent;
}

btnEdit.addEventListener('click', () => {
    popupProfileForm.open();
    fillProfValue();
    validProfForm.removeInputErrors();
    validProfForm.enableButton();
});

btnAddPlace.addEventListener('click', () => {
    popupPlaceForm.open();
    validPlaceForm.disableButton();
    validPlaceForm.removeInputErrors();
});

const validPlaceForm = new FormValidator(formElementPlace, validationConfig);
validPlaceForm.enableValidation();

const validProfForm = new FormValidator(formElementProf, validationConfig);
validProfForm.enableValidation();

const imgPopup = new PopupWithImage(popupImage);
imgPopup.setEventListeners();

const popupPlaceForm = new PopupWithForm(popupPlace, handleCardFormSubmit);
popupPlaceForm.setEventListeners();

const profileInfo = new UserInfo({firstName: firstName, description: description});

const popupProfileForm = new PopupWithForm(popupProfile, handleProfileFormSubmit);
popupProfileForm.setEventListeners();
