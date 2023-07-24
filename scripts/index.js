let btnEdit = document.querySelector(".profile__edit-button");
let popupProfile = document.querySelector("#popup__profile");
let popupPlace = document.querySelector("#popup__place");
let popupImage = document.querySelector("#popup__image")
let nameInput = document.querySelector(".popup__input_date_name");
let jobInput = document.querySelector(".popup__input_date_describe");
let imgNameInp = document.querySelector(".popup__input_date_place");
let imgSrcInp = document.querySelector(".popup__input_date_src");
let firstName = document.querySelector(".profile__name");
let descript = document.querySelector(".profile__description");
let btnAddPlace = document.querySelector(".profile__add-button");
let btnCloseProf = document.querySelector('#profile__close');
let btnClosePlace = document.querySelector('#place__close');
let formElementProf = document.querySelector('[name="popupEditProf"]');
let formElementPlace = document.querySelector('[name="popupAddPlace"]');
let popupCardImg = document.querySelector('.popup__card-image');
let popupCardDescribe = document.querySelector('.popup__describe');
let popupImgClose= document.querySelector('.popup__close_place_card');
let popupImg = document.querySelector('#popup__image');
let cards = document.querySelector('.cards');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  for (let i = 0; i < initialCards.length; i++) {
    cardDate = cardCreate(initialCards[i].name, initialCards[i].link);
    addCard(cardDate, cards);
}

function addCard(card, spot) {
    spot.prepend(card);
}

function popupOpen(openElement){
    openElement.classList.add('popup_opened');
}

function popupClose(closeElement){
    closeElement.classList.remove('popup_opened');
}

function openImage(cardName, src){
    popupOpen(popupImage);
    popupCardImg.src = src;
    popupCardDescribe.textContent = cardName;

}

function cardCreate(cardName, src){
    const cardTemplate = document.querySelector(".card-template").content;
    const cardContent = cardTemplate.querySelector(".card").cloneNode(true);
    const imageCard = cardContent.querySelector(".card__image");
    imageCard.src = src;
    cardContent.querySelector('.card__name').textContent = cardName;
    cardContent.querySelector('.card__btn-like').addEventListener('click', cardLike);
    cardContent.querySelector('.card__trash').addEventListener('click', cardRemove);
    cardContent.querySelector('.card__image').addEventListener('click', (e)=>{
        openImage(cardName, src);
    });
    return cardContent;

}


function ProfileFormSubmit (evt) {
    evt.preventDefault(); 
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    firstName.textContent = nameValue;
    descript.textContent = jobValue;
    popupClose(popupProfile);
}
 
function PlaceFormSubmit (evt) {
    evt.preventDefault(); 
    let imgName = imgNameInp.value;
    let imgSrc = imgSrcInp.value;
    let newCard = cardCreate(imgName, imgSrc);
    addCard(newCard, cards);
    popupClose(popupPlace);
    imgNameInp.value = '';
    imgSrcInp.value = '';
}; 

function cardLike(evt){
    evt.target.classList.toggle("card__btn-like_active");
}

function cardRemove(evt){
    evt.target.closest('.card').remove();
}

formElementPlace.addEventListener('submit', PlaceFormSubmit);
formElementProf.addEventListener('submit', ProfileFormSubmit); 

btnCloseProf.addEventListener('click', () => {
    popupClose(popupProfile);
});

btnClosePlace.addEventListener('click', () => {
    popupClose(popupPlace);
});

btnEdit.addEventListener('click', (e) => {
    popupOpen(popupProfile);
    nameInput.value = firstName.textContent;
    jobInput.value = descript.textContent;
});

btnAddPlace.addEventListener('click', (e) => {
    popupOpen(popupPlace);});

popupImgClose.addEventListener('click', () => {
    popupClose(popupImg);
});