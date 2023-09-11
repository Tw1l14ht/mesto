import Popup from "./Popup";

export default class PopopWithDelete extends Popup{
    constructor(popupSelector, handleDelete){
        super(popupSelector);
        this._formDelete = this._popup.querySelector("#deleteForm");
        this._handleDelete = handleDelete;
    }

    open(delCard){
        super.open();
        this._delCard = delCard;
    }

    setEventListeners(){
        super.setEventListeners();
        this._formDelete.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleDelete(this._delCard);
        });
    }
}