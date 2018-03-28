/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 13:58
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import xt, {Api} from '../../../extension'
import {ApiForm, TouchDelay} from '../../../extension/decorate';
import devStore from './DevStore';

class LoginStore {

    userName: string = "";
    @observable
    passWord: string = "";
    @observable
    _isValid: boolean = false;

    @action
    initLogin() {
        this.userName = xt.data.userAgent.name;
        this.passWord = xt.data.userAgent.passWord;
    }

    login = async () => {
        xt.ui.showLoading("登录中...");
        this.requestLogin({
            name: this.userName,
            language: 'zh_CN',
            password: this.passWord
        });
    };

    @ApiForm(Api.ES, '/fc/appLogin')
    requestLogin(error, user) {
        xt.ui.hideLoading();
        if (error) {
            xt.ui.showEToast(error);
        } else {
            xt.data.userAgent = {name: this.userName, passWord: this.passWord};
            xt.data.user = user.data;
            console.log(user.data);
            Actions.reset("home");
            Api.saveCookie();
        }
    }

    //用户名改变时候,让密码都清空
    _onNameInput = name => {
        let that = this;
        this.userName = name;
        if (name !== xt.data.userAgent.name) {
            if (xt.data.userAgent.passWord === that.passWord) {
                that._onPasswordInput('');
            }else{
                this._validinputpassword();
            }
        } else {
            that._onPasswordInput(xt.data.userAgent.passWord);
        }
    };

    //密码改变
    @action
    _onPasswordInput = password => {
        this.passWord = password;
        this._validinputpassword();
    };

    //必须要输入用户名和密码 才能点击登录按钮
    @action
    _validinputpassword = () => {
      this._isValid = xt.isBlank(this.userName) || xt.isBlank(this.passWord);
    };

    @computed
    get validlogin () {
        return !!this._isValid;
    }




    //点击忘记密码时,提供一个弹窗提示
    forgetTip = () => {
        xt.ui.showTip("当前版本未开放,请在电脑上进行操作!");
    };
}

export default new LoginStore();
