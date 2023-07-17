let edit_btn = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector(".popup__user-name");
let jobInput = document.querySelector(".popup__descript");

edit_btn.addEventListener('click', (e) => {
    popup.classList.add('popup_opened');
    let name = document.querySelector(".profile__name");
    nameInput.value = name.textContent;
    let descript = document.querySelector(".profile__description");
    jobInput.value = descript.textContent;
});

let close_btn = document.querySelector('.popup__close');
close_btn.addEventListener('click', (e) => {
    popup.classList.remove('popup_opened');
} );


// Находим форму в DOM
let formElement = document.querySelector(".popup__button-save");// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    let name = document.querySelector(".profile__name");
    let descript = document.querySelector(".profile__description");

    name.textContent = nameValue;
    descript.textContent = jobValue;
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('click', handleFormSubmit); 
 
