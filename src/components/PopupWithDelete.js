import Popup from "./Popup";

export default class PopopWithDelete extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._delBtn = this._popup.querySelector("#popup__trash-btn");
    }

    open(delCard){
        super.open();
        this._delCard = delCard;
        this._delBtn.onclick = this._delCard;
    }
}