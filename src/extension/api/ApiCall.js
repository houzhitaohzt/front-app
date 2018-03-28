/* @flow */

import {InteractionManager, NativeModules, Platform, AsyncStorage} from 'react-native';
import xt from './../../extension';
type fetch = ()=> void;

const errorMessage = {
    "1000": "数据请求超时, 请检查网络连接!",
    "1001": "服务器异常, 请稍后重试!",
};
const timeOut = 15000;//15秒钟超时

class ApiCall {

    constructor(){
        this.initCookie();
    }

    /**
     * 拼接请求
     * @param uri
     * @param method
     * @returns {string}
     */
    getURL (uri: string, method: string): string{
        let request = `${xt.data.origin}/${xt.data.getUri(uri)}${method}`;
        console.log(request);
        return request;
    }

    /**
     * 获取基本的请求header
     * @returns Object
     */
    getHeaders (): Object{
        return {
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8',
        }
    }

    /**
     * 获取基本的Form请求header
     * @returns Object
     */
    getFormHeaders(): Object {
        return {
            'Accept': 'application/json;charset=utf-8',
            "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }

    /**
     * 获取Android Cookie
     * @Platform Android
     * @param fromUrl
     * @returns {Promise<*>}
     */
    async getCookieHeader (fromUrl : string): Object {
        let Cookie = "";
        if(Platform.OS === 'android'){
            Cookie = await NativeModules.CookieManager.getCookie(fromUrl.split("?")[0]);
        }
        return {Cookie};
    }

    /**
     * 拼接请求参数
     * @param args
     * @returns {string}
     */
    getURLParams (args: ?Object = {}): string{
        let params = "", keys = Object.keys(args);
        keys.forEach((k, ix) => {
            params += (ix !== 0 ? "&" : "") + `${k}=${args[k]}`;
        });
        console.log(args);
        return params;
    }

    /**
     * 初始化Cookie, 目前iOS 用,android不需考虑
     * @Platform iOS
     */
    async initCookie (): void {
        if (Platform.OS !== 'ios') return;
        let that = this;
        let CookieManager = NativeModules.CookieManager;
        let cookie = JSON.parse(await AsyncStorage.getItem("Cookie") || "{}");
        Object.keys(cookie).forEach(ck => {
            CookieManager.set(Object.assign({}, cookie[ck], {origin: xt.data.origin}), xt.noop);
        });
    }

    /**
     * 保存Cookie, 目前iOS 用,android不需考虑
     * @Platform iOS
     */
    saveCookie (): void{
        if (Platform.OS !== 'ios') return;
        let that = this;
        let CookieManager = NativeModules.CookieManager;
        CookieManager.getAll(async (cookie)=> {
            await AsyncStorage.setItem("Cookie", JSON.stringify(cookie));
        });
    }

    /**
     * 转换接口数据
     * @param response
     * @param resolve
     * @param reject
     * @returns {Promise.<void>}
     */
    async toResult (response, resolve, reject){
        let status = response.status;
        if (status === 200){

            let data = await response.json();
            if('status' in data && data.status !== 'success'){
                console.log(data);
                reject(data.message || errorMessage['1001']);
            } else {
                InteractionManager.runAfterInteractions(()=>resolve(data));
            }

        } else if(status === 501){
            reject("登录已失效");
            //登录失效
            xt.ui.showTip("登录已失效, 请重新登录", {
                done: ()=> xt.data.logout()
            })
        } else {
            reject(errorMessage['1001'] + "\n错误代码: " + status);
        }
    }

    /**
     * post 请求数据接口
     * @param uri
     * @param method
     * @param args
     * @returns {Promise}
     */
    post (uri: string, method: string, args: Object = {}): Promise {
        let that = this;
        return new Promise(async (resolve, reject)=>{
            let timer = setTimeout(()=>{
                timer = null;
                reject(errorMessage[1000]);
            }, timeOut);
            try {
                console.log(args);
                let url = that.getURL(uri, method);
                let response = await fetch( url, {
                        method: 'POST',
                        headers: that.getHeaders(),
                        body: JSON.stringify(args)
                    }
                );
                timer && await that.toResult(response, resolve, reject);
            } catch (e){
                console.warn(e);
                reject(errorMessage['1001']);
            } finally {
                timer && clearTimeout(timer);
                timer = null;
            }
        });
    }

    /**
     * get 请求数据接口
     * @param uri
     * @param method
     * @param args
     * @returns {Promise}
     */
    get (uri: string, method: string, args: Object = {}): Promise {
        let that = this;
        return new Promise(async (resolve, reject)=>{
            let timer = setTimeout(()=>{
                timer = null;
                reject(errorMessage[1000]);
            }, timeOut);
            try {
                let url = that.getURL(uri, method), params = that.getURLParams(args);
                url = `${url}?${params}`;
                let response = await fetch( url, {headers: that.getHeaders() });
                timer && await that.toResult(response, resolve, reject);
            } catch (e){
                console.warn(e);
                reject(errorMessage['1001']);
            } finally {
                timer && clearTimeout(timer);
                timer = null;
            }
        });
    }

    /**
     * form 请求接口数据
     * @param uri
     * @param method
     * @param args
     * @returns {Promise}
     */
    form (uri: string, method: string, args: Object = {}): Promise {
        let that = this;
        return new Promise(async (resolve, reject)=>{
            let timer = setTimeout(()=>{
                timer = null;
                reject(errorMessage[1000]);
            }, timeOut);
            try {
                let url = that.getURL(uri, method);
                let response = await fetch( url, {
                        method: 'POST',
                        headers: that.getFormHeaders(),
                        body: that.getURLParams(args)
                    }
                );
                console.log(response.headers);
                timer && await that.toResult(response, resolve, reject);
            } catch (e){
                console.warn(e);
                reject(errorMessage['1001']);
            } finally {
                timer && clearTimeout(timer);
                timer = null;
            }
        });
    }
}
/**
 * http api call
 */
export default new ApiCall;