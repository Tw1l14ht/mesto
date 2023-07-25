const popupElem = document.querySelectorAll('.popup');
const btnEdit = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector("#popup__profile");
const popupPlace = document.querySelector("#popup__place");
const popupImage = document.querySelector("#popup__image")
const nameInput = document.querySelector(".popup__input_date_name");
const jobInput = document.querySelector(".popup__input_date_describe");
const imgNameInp = document.querySelector(".popup__input_date_place");
const imgSrcInp = document.querySelector(".popup__input_date_src");
const firstName = document.querySelector(".profile__name");
const descript = document.querySelector(".profile__description");
const btnAddPlace = document.querySelector(".profile__add-button");
const btnCloseProf = document.querySelector('#profile__close');
const btnClosePlace = document.querySelector('#place__close');
const formElementProf = document.querySelector('[name="popupEditProf"]');
const formElementPlace = document.querySelector('[name="popupAddPlace"]');
const popupCardImg = document.querySelector('.popup__card-image');
const popupCardDescribe = document.querySelector('.popup__describe');
const popupImgClose= document.querySelector('.popup__close_place_card');
const saveBtnProf = formElementProf.querySelector('.popup__button-save');
const saveBtnPlace = formElementPlace.querySelector('.popup__button-save');
const popupImg = document.querySelector('#popup__image');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector(".card-template").content;
const validList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  }

initialCards.forEach((i) => {
    cardDate = createCard(i.name, i.link);
    addCard(cardDate, cards);
});

popupElem.forEach((item) => item.addEventListener('mousedown', function(evt){
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}))

function addCard(card, spot) {
    spot.prepend(card);
}

function openPopup(openElement){
    openElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(closeElement){
    closeElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function openImage(cardName, src){
    openPopup(popupImage);
    popupCardImg.src = src;
    popupCardImg.alt = cardName;
    popupCardDescribe.textContent = cardName;

}

function createCard(cardName, src){
    const cardContent = cardTemplate.querySelector(".card").cloneNode(true);
    const imageCard = cardContent.querySelector(".card__image");
    imageCard.src = src;
    imageCard.alt = cardName;
    cardContent.querySelector('.card__name').textContent = cardName;
    cardContent.querySelector('.card__btn-like').addEventListener('click', likeCard);
    cardContent.querySelector('.card__trash').addEventListener('click', removeCard);
    imageCard.addEventListener('click', (e)=>{
        openImage(cardName, src);
    });
    return cardContent;

}


function profileFormSubmit (evt) {
    evt.preventDefault(); 
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    firstName.textContent = nameValue;
    descript.textContent = jobValue;
    installDisButton(saveBtnProf, validList);
    closePopup(popupProfile);
}
 
function placeFormSubmit (evt) {
    evt.preventDefault(); 
    let imgName = imgNameInp.value;
    let imgSrc = imgSrcInp.value;
    let newCard = createCard(imgName, imgSrc);
    addCard(newCard, cards);
    clearValue(imgNameInp, imgSrcInp)
    installDisButton(saveBtnPlace, validList);
    closePopup(popupPlace);
}; 

function likeCard(evt){
    evt.target.classList.toggle("card__btn-like_active");
}

function removeCard(evt){
    evt.target.closest('.card').remove();
}

formElementPlace.addEventListener('submit', placeFormSubmit);
formElementProf.addEventListener('submit', profileFormSubmit); 

btnCloseProf.addEventListener('click', () => {
    closePopup(popupProfile);
});

btnClosePlace.addEventListener('click', () => {
    closePopup(popupPlace);
});

function fillProfValue(){
    nameInput.value = firstName.textContent;
    jobInput.value = descript.textContent;
}

function clearValue(first, second){
    first.value = '';
    second.value= '';
}

function closePopupEsc(evt){
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    }
}

btnEdit.addEventListener('click', (e) => {
    openPopup(popupProfile);
    fillProfValue();
    removeInputErrors(popupProfile);
    installActBtn(saveBtnProf, validList);
});

btnAddPlace.addEventListener('click', (e) => {
    openPopup(popupPlace);
    clearValue(imgNameInp, imgSrcInp);
    removeInputErrors(popupPlace);
});
popupImgClose.addEventListener('click', () => {
    closePopup(popupImg);
});