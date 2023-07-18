let btnEdit = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector(".popup__input_date_name");
let jobInput = document.querySelector(".popup__input_date_describe");
let firstName = document.querySelector(".profile__name");
let descript = document.querySelector(".profile__description");

btnEdit.addEventListener('click', (e) => {
    popup.classList.add('popup_opened');
    nameInput.value = firstName.textContent;
    jobInput.value = descript.textContent;
});

let btnClose = document.querySelector('.popup__close');
btnClose.addEventListener('click', (e) => {
    popup.classList.remove('popup_opened');
} );


// Находим форму в DOM
let formElement = document.querySelector('[name="popupForm"]');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    firstName.textContent = nameValue;
    descript.textContent = jobValue;
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 
 
