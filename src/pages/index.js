import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';

import {
    btnEdit,
    popupProfile,
    popupPlace,
    popupAvatar,
    popupImage,
    nameInput,
    jobInput,
    firstName,
    description,
    btnAddPlace,
    formElementProf,
    formElementAvatar,
    formElementPlace,
    addAvatar,
    validationConfig,
    cardApi,
    btnSaveCard,
    btnSaveAvatar,
    btnSaveProfile,
    btnTrash
} from '../utils/constants.js'

function openPopup(title, src){
    imgPopup.open(title, src);
}

function createCard(data){
    const card = new Card(data, userId, openPopup, popupImage, '.card-template', putLikeCard, deleteLikeCard, deleteCard)
    const cardComplited = card.generateCard();

    return cardComplited;
}

function deleteCard(card){
  popupDelete.open(card);
}

function handleDelete(card) {
  btnTrash.textContent = 'Удаление...';
  interf.removeCard(card.getCardId())
    .then(() => {
      card.removeCard();
      popupDelete.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      btnTrash.textContent = 'Да';    
    });
}

function putLikeCard(item) {
  interf
    .getLike(item.getCardId())
    .then((data) => {
      item.putLike();
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteLikeCard(item) {
  interf
    .removeLike(item.getCardId())
    .then(() => {
      item.removeLike();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleProfileFormSubmit(data, form) {
    const sendData = {name: data.inpName, about: data.inpDescribe};
    interf.patchUser({
      name: sendData.name,
      about: sendData.about
    }).then(() => {
      profileInfo.setUserInfo({name: sendData.name, about: sendData.about});
      form.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(btnSaveProfile, false);
    });
}
 
function handleAvatarFormSubmit(src , form){
  const data = {avatar: src.avatarSrc}
  interf
  .patchAvatar({ avatar: data.avatar })
        .then(() => {
          profileInfo.setNewAvatar({avatar: data.avatar});
          form.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(btnSaveAvatar, false);
        });
}

function handleCardFormSubmit(inputs, form) {
  interf.addNewCard(inputs)
      .then((inputs) => {
        const newCard = createCard(inputs);
        cardList.addItem(newCard);
        form.close();
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(btnSaveCard, false);
      });
}; 

function fillProfValue({name, about}){
    nameInput.value = name;
    jobInput.value = about;
}

function renderLoading(button, isLoad){
    if(isLoad){
      button.textContent = 'Сохранение...';
    }
    else{
      button.textContent = 'Сохранить';
    }
}


btnEdit.addEventListener('click', () => {
    popupProfileForm.open();
    const userData = profileInfo.getUserInfo();
    fillProfValue({name: userData.name, about: userData.about});
    validProfForm.removeInputErrors();
    validProfForm.enableButton();
});

addAvatar.addEventListener("click", () => {
  popupAvatarForm.open();
  validAvatarForm.disableButton();
  validAvatarForm.removeInputErrors();

});

btnAddPlace.addEventListener('click', () => {
    popupPlaceForm.open();
    validPlaceForm.disableButton();
    validPlaceForm.removeInputErrors();
});

const interf = new Api(cardApi);

let userId;

let cardList = new Section(
  {
    renderer: (card) => {
      cardList.addItem(createCard(card));
    }
  },".cards");

const validPlaceForm = new FormValidator(formElementPlace, validationConfig);
validPlaceForm.enableValidation();

const validProfForm = new FormValidator(formElementProf, validationConfig);
validProfForm.enableValidation();

const validAvatarForm = new FormValidator(formElementAvatar, validationConfig);
validAvatarForm.enableValidation();

const imgPopup = new PopupWithImage(popupImage);
imgPopup.setEventListeners();

const popupPlaceForm = new PopupWithForm(popupPlace, handleCardFormSubmit);
popupPlaceForm.setEventListeners();

const popupAvatarForm = new PopupWithForm(popupAvatar, handleAvatarFormSubmit);
popupAvatarForm.setEventListeners();

const popupDelete = new PopupWithDelete(document.querySelector('#popup__trash'), handleDelete)
popupDelete.setEventListeners();


const profileInfo = new UserInfo({firstName: firstName, description: description, avatarSelector: ".profile__avatar"});

const popupProfileForm = new PopupWithForm(popupProfile, handleProfileFormSubmit);
popupProfileForm.setEventListeners();

Promise.all([interf.getInfo(), interf.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    profileInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
    cardList.renderItems(cardData);
  })
  .catch((err) => {
    console.log(err);
  });