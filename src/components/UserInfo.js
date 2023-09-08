export default class UserInfo {
    constructor({ firstName, description }) {
        this._name = firstName;
        this._jobValue = description;
    }

    getUserInfo() {
        const userObj = {
            inpName: this._name.textContent,
            inpDescribe: this._jobValue.textContent
        }
        return userObj
    }

    setUserInfo(userObj) {
        this._name.textContent = userObj.inpName;
        this._jobValue.textContent = userObj.inpDescribe;
        console.log(this._name, this._jobValue);
    }
}