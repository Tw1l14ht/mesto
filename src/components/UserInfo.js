export default class UserInfo {
    constructor({ firstName, description, avatarSelector}) {
        this._name = firstName;
        this._jobValue = description;
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userObj = {
            name: this._name.textContent,
            about: this._jobValue.textContent
        }
        return userObj
    }

    setUserInfo({name, about, avatar = this._avatar.src}) {
        this._name.textContent = name;
        this._jobValue.textContent = about;
        this._avatar.src = avatar;
    }

    setNewAvatar({ avatar }){
        this._avatar.src = avatar;
    }
}