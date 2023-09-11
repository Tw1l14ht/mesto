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
  popupDelete.open(() => {
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

function handleProfileFormSubmit(data) {
    const sendData = {name: data.inpName, about: data.inpDescribe};
    profileInfo.setUserInfo({name: sendData.name, about: sendData.about});
    interf.patchUser({
      name: sendData.name,
      about: sendData.about
    }).catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btnSaveProfile.textContent = 'Сохранить';
    });
}
 
function handleAvatarFormSubmit(src){
  const data = {avatar: src.avatarSrc}
  profileInfo.setNewAvatar({avatar: data.avatar});
  interf
  .patchAvatar({ avatar: data.avatar })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          btnSaveAvatar.textContent = 'Сохранить';
        });
}

function handleCardFormSubmit(inputs) {
  interf.addNewCard(inputs)
      .then((inputs) => {
        const newCard = createCard(inputs);
        cardList.addItem(newCard);
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnSaveCard.textContent = 'Сохранить';
      });
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
const cardsServer = interf
  .getInitialCards()
  .then(function (data) {
    cardList = new Section(
      {
        items: data,
        renderer: (card) => {
          cardList.addItem(createCard(card));
        },
      },
      ".cards"
    );
  })
  .catch((err) => {
    console.log(err);
  });



const userInfo = interf
    .getInfo()
    .then((data) => {
      userId = data._id;
      profileInfo.setUserInfo({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      });
    })
    .catch((err) => {
      console.log(err);
    });


let userId;
let cardList;
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

const popupDelete = new PopupWithDelete(document.querySelector('.popup__trash'))
popupDelete.setEventListeners();


const profileInfo = new UserInfo({firstName: firstName, description: description, avatarSelector: ".profile__avatar"});

const popupProfileForm = new PopupWithForm(popupProfile, handleProfileFormSubmit);
popupProfileForm.setEventListeners();

Promise.all([userInfo, cardsServer]).then(() => cardList.renderItems());