/* @flow */
import {
    AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import NativeCommon from '../native/Common';
import ProjectData from '../../assets/project.json';

import type {
    UserDefinition, ProjectDefinition
} from '../../definition/data';

type URIDefinition = {
    name: string,
    value: string
}

export type DataDefinition = {
    init: (callback: ()=> void ) => void,
    config: ProjectDefinition,
    user: UserDefinition,
    userAgent: UserDefinition,
    host: string,
    origin: string,
    uri: URIDefinition,
    logout: ()=> void,
    getUri: ()=> string,
    hasMenu: (key: string)=> boolean,
    setUri: (uri: URIDefinition)=> void;
    isDev: boolean,
}

class data {
    constant = {
        user: 'USER',
        userAgent: 'USER_AGENT',
        host: 'API_HOST',
    };
    _user: UserDefinition; // 用户信息
    _userAgent: UserDefinition;
    config: ProjectDefinition = ProjectData;
    _host; // host 地址
    _uri: URIDefinition = {}; //eg:fooding-ds, fooding-erp
    get userAgent() {
        return this._userAgent || {};
    }

    set userAgent(value) {
        this._userAgent = value;
        if(value){
            AsyncStorage.setItem(this.constant.userAgent, JSON.stringify(value));
        } else {
            AsyncStorage.removeItem(this.constant.userAgent);
        }
    }

    /**
     * 进入App的时候初始化基本的数据
     * @param callback
     * @returns {Promise.<void>}
     */
    async init (callback): void {
        let userData = await AsyncStorage.getItem(this.constant.user);
        this._user = userData && JSON.parse(userData);
        let userAgent = await AsyncStorage.getItem(this.constant.userAgent);
        this._userAgent = userAgent && JSON.parse(userAgent);

        this._host = await AsyncStorage.getItem(this.constant.host);
        callback();
    }

    get user(): UserDefinition {
        return this._user || {};
    }

    set user(value ?: UserDefinition) {
        this._user = value;
        if(value){
            AsyncStorage.setItem(this.constant.user, JSON.stringify(value));
        } else {
            AsyncStorage.removeItem(this.constant.user);
        }
    }

    //菜单权限
    hasMenu(key){
        return !!~(this.user.menuidentitys || []).indexOf(key);
    }

    /**
     * 退出登录, 清空一些数据
     */
    logout (): void {
        this.user = null;
        Actions.reset("login");
    }

    // ==============dev============

    get origin (){
        return "https://" + this.host;
    }

    get host() {
        return this._host || this.config.api;
    }

    set host(value) {
        this._host = value;
        if(value){
            AsyncStorage.setItem(this.constant.host, String(value));
        } else {
            AsyncStorage.removeItem(this.constant.host);
        }
    }

    get uri (){
        return this._uri;
    }

    getUri (name){
        return (this._uri.name === name? this._uri.value: name) || name;
    }

    setUri (uri: URIDefinition){
        this._uri = Object.assign({}, this._uri, uri);
    }
}

export default new data();