export default class UserInfo {
    constructor({ firstName, description }) {
        this._name = firstName;
        this._jobValue = description;
    }

    getUserInfo() {
        const userObj = {
            inp_name: this._name.textContent,
            inp_describe: this._jobValue.textContent
        }
        return userObj
    }

    setUserInfo(userObj) {
        this._name.textContent = userObj.inp_name;
        this._jobValue.textContent = userObj.inp_describe;
        console.log(this._name, this._jobValue);
    }
}