/**
 * @flow
 * @author tangzehua
 * @since 2017-05-13 16:15
 */
import {Platform, Dimensions} from 'react-native';
import ui from './ui';
import data, {DataDefinition} from '../custom/data';
import date from './date';
import constant, {ConstantDefinition} from '../custom/const';
import Common from '../native/Common';
export const ignoreEquals = 'ignore_equals';
export const continuFormLabel = "s_label";
export const continueFormKey = 's_';

export default class xt {
    static ui = ui;
    static data: DataDefinition = data;
    static date = date;
    static constant: ConstantDefinition = constant;

    static noop = (): void => { };

    /**
     * Check the obj whether is function or not
     * @param {*} obj
     * @returns {boolean}
     */
    static isFunction (obj) {
        return typeof obj === 'function';
    }

    /**
     * Check the obj whether is number or not
     * @param {*} obj
     * @returns {boolean}
     */
    static isNumber (obj) {
        return typeof obj === 'number' || Object.prototype.toString.call(obj) === '[object Number]';
    }

    /**
     * Check the obj whether is string or not
     * @param {*} obj
     * @returns {boolean}
     */
    static isString (obj) {
        return typeof obj === 'string' || Object.prototype.toString.call(obj) === '[object String]';
    }

    /**
     * Check the obj whether is array or not
     * @param {*} obj
     * @returns {boolean}
     */
    static isArray (obj) {
        return Array.isArray(obj) ||
            (typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Array]');
    }

    /**
     * Check the obj whether is undefined or not
     * @param {*} obj
     * @returns {boolean}
     */
    static isUndefined (obj) {
        return typeof obj === 'undefined';
    }

    /**
     * Check the obj whether is undefined or null
     * @param {*} obj
     * @returns {boolean}
     */
    static isEmpty(obj) {
        return typeof obj === 'undefined' || obj === null;
    }

    /**
     * Check the obj whether is undefined or null or space string
     * @param {*} obj
     * @returns {boolean}
     */
    static isBlank(obj){
        return typeof obj === 'undefined' || obj === null || obj.trim().length === 0;
    }

    /**
     * Check the obj whether is object or not
     * @param {*} obj
     * @returns {boolean}
     */
    static isObject (obj) {
        return typeof obj === "object" && Object.prototype.toString.call(obj) === '[object Object]';
    }

    /**
     * 判断是否为android
     * @returns {boolean}
     */
    static isAndroid (){
        return Platform.OS === 'android';
    }

    /**
     * 判断是否为ios
     * @returns {boolean}
     */
    static isIOS (){
        return Platform.OS === 'ios';
    }

    /**
     * 是否为开发模式
     * @returns {boolean}
     */
    static isDev (){
        return Common.Channel === 'Dev';
    }

    /**
     * 判断是否为iPhone X
     * @returns {boolean}
     */
    static isIphoneX (){
        // const {height, scale} = Dimensions.get('window');
        // return Platform.OS === 'ios' && height * scale === 2436;
        return false;
    }

    /**
     * 数字补 0
     * @param num
     * @param median 位数
     */
    static patchZero (num: number, median: ?number): string {
        let tmp = "000000000000000000";
        median = median || 2;
        num =  String(num);
        let ns = num.length;
        if (ns >= median) return num;
        return tmp.substring(0, median - ns) + num;
    }

    /**
     * 根据keys 获取object中的值
     * object = {a: {b: {c: 'c', c1: 'c1'}, b1: [1, 2, 3]}, a1: 'a1'}
     * getItemValue(object, 'a.b.c') === 'c'
     * getItemValue(object, 'a.e.e', 'default') === 'default'
     * getItemValue(object, 'a.b1.1') === 2 //也可以取数组
     * @param {Object|Array} object 取值对象
     * @param {String} keys 取值表达式
     * @param {*} [defaultValue]
     * @returns {*}
     */
    static getItemValue(object, keys, defaultValue) {
        if (xt.isEmpty(object)) return defaultValue;
        let k = keys.split(".");
        let value = {};
        for (let vk of k) {
            value = value[vk] || object[vk];
            if (!value) break;
        }
        return xt.isEmpty(value) ? defaultValue : value;
    }

    /**
     * 根据条件值判断原始值与范围值是否成立
     * @param {*} originalValue 原始比对数据
     * @param {*} rangeValue 范围值
     * @param {String} exp (==, ===, !=, !==, <>, ><)
     * @returns {boolean}
     */
    static conditionJudge (originalValue, rangeValue, exp) {
        let range = xt.isArray(rangeValue)? rangeValue: [rangeValue];
        switch (exp) {
            case '==':
                return !!~range.indexOf(originalValue);
            case '===':
                return !!~range.findIndex(da => da === originalValue);
            case '!=':
                return !~range.indexOf(originalValue);
            case '!==':
                return !~range.findIndex(da => da === originalValue);
            case '<>':
                return range.length === 2 && originalValue < parseFloat(range[0]) && originalValue > parseFloat(range[1]);
            case '><':
                return range.length === 2 && originalValue > parseFloat(range[0]) && originalValue < parseFloat(range[1]);
            default:
                break;
        }
        return false;
    }

    /**
     * 组值条件判断
     * condition = [
     *  {key: 'irowSts.id', value: 5, exp: '==='},
     *  'and',
     *  {key: 'irowSts.name', value: [5, 10], exp: '!=='},
     * ]
     * @param {Object} object
     * @param {Array} condiAry
     */
    static condition (object, condiAry){
        let lastCodi = false;
        condiAry = xt.isArray(condiAry) ? condiAry : [condiAry];
        for (let i = 0, j = condiAry.length; i < j; i++) {
            let codi = condiAry[i];
            if (xt.isString(codi)) {
                if (lastCodi && codi === 'or') {
                    return true;
                }
                if (!lastCodi && codi === 'and') {
                    return false;
                }
            } else {
                lastCodi = xt.conditionJudge(xt.getItemValue(object, codi.key), codi.value, codi.exp);
            }
        }
        return lastCodi;
    }

    /**
     * 根据条件创建React.Node
     * let abc = {a: 1, b: 2}
     * xt.conditionComponents(abc, [
     *      {
     *          visible: true,//外部控制, default true
     *          condition: {key: 'a', value: 1, exp: '=='},
     *          content: <i>A</i>
     *      },
     *      {
     *          visible: false,
     *          condition: [
     *              {key: 'a', value: 1, exp: '=='},
     *              {key: 'b', value: 2, exp: '=='}
     *          ],
     *          content: <i>B</i>
     *      },
     *      {
     *          visible: true,
     *          condition: [
     *              {key: 'a', value: 2, exp: '=='},
     *              {key: 'b', value: 2, exp: '=='}
     *          ],
     *          content: <i>C</i>
     *      }
     * ])
     * 输出: <i>A</i>, <i>B</i>
     * @param {Object} object
     * @param {Array} condiCompAry [{content: React.Node, condition: Array|String}]
     * @returns {Array}
     */
    static conditionComponents(object, condiCompAry) {
        let comp = [];
        condiCompAry.forEach(da => {
            let {condition, visible = true, content} = da;
            if (visible && (xt.isEmpty(condition) || xt.condition(object, condition))) {
                comp.push(content);
            }
        });
        return comp;
    }

    /**
     * React 渲染判断
     * ignore_equals 可忽略本次对象的判断
     * @param nObj
     * @param oObj
     * @returns {boolean}
     */
    static equalsObject(nObj, oObj) {
        if (xt.isEmpty(nObj) || xt.isEmpty(oObj)) return nObj === oObj;
        let entries = Object.entries(nObj);
        for (let [key, value] of entries) {
            if (xt.isFunction(value)) continue;
            if (key === 'ignore_equals' && value !== false) return true;

            if (xt.isArray(value) && xt.isArray(oObj[key])) {
                let oAry = oObj[key];
                if (value.length !== oAry.length) return true;
                for (let i = 0, j = value.length; i < j; i++) {
                    if (xt.equalsObject(value[i], oAry[i])) {
                        return true;
                    }
                }
            } else if (xt.isObject(value)) {
                if (!oObj[key] || (!value['$$typeof'] && xt.equalsObject(value, oObj[key]))) {
                    return true;
                }
            } else if (value !== oObj[key]) {
                return true;
            }
        }
        return false;
    }

    static formatFormData(postData) {
        let newData = {};
        for (let key in postData) {
            let da = postData[key];
            if (Array.isArray(da) && da.length && xt.isObject(da[0])) {
                for (let i = 0, j = da.length; i < j; i++) {
                    for (let yj in da[i]) {
                        newData[`${key}[${i}].${yj}`] = da[i][yj];
                    }
                }
            } else if (xt.isObject(da)) {
                for (let yj in da) {
                    newData[`${key}.${yj}`] = da[yj];
                }
            } else {
                newData[key] = da;
            }
        }
        return newData;
    }

    /**
     * 获取url 参数
     * @param qs
     * @param href
     * @returns {string}
     */
    static getQueryParameter(qs, href) {
        let s = href || location.href;
        s = s.replace("?", "?&").split("&");//这样可以保证第一个参数也能分出来
        let re = "";
        for (let i = 1; i < s.length; i++)
            if (s[i].indexOf(qs + "=") === 0)
                re = s[i].replace(qs + "=", "");//取代前面的参数名，只剩下参数值

        return re;
    }

    /**
     * 吧 url 参数转换为对象
     * @param url
     * @returns {string}
     */
    static parseQueryParameter(url) {
        let s = url.substr(url.indexOf("?") + 1, url.length);
        let us = s.split("&");
        let re = {};
        for (let i = 0, j = us.length; i < j; i++) {
            let s1 = us[i], s2 = s1.split("=");
            if (s2.length > 1 && s2[0]) re[s2[0]] = s1.substr(s1.indexOf("=") + 1, s1.length);
        }
        return re;
    }

    /**
     *
     * @param {String} msg
     * @param args
     * @returns {*}
     */
    static string(msg, ...args) {
        for (let i = 0; i < args.length; i++) {
            msg = msg.replace(/(%s)|(%d)/, args[i]);
        }
        return msg;
    }

    /**
     * 替换字符串
     * "-{a}-".replaceTm({a: 1});
     * "-1-"
     * @param str
     * @param $data
     * @returns {*}
     */
    static stringTm (str, $data){
        if (!$data) return str;

        return str.replace(new RegExp('({[A-Za-z_]+[A-Za-z0-9_-]*})','g'), function($1) {
            return $data[$1.replace(/[{}]+/g, '')]
        })
    }

    /**
     * 正则表达式
     * @type {{positiveNonZero: RegExp}}
     */
    static pattern = {
        positiveNonZero: /^[1-9]\d*(\.\d+)?$|0\.\d*[1-9]\d*$/,
        positiveInteger: /^[1-9]\d*$/,
        positiveZero:/^[1-9]\d*(\.\d+)?$|0(\.\d*[1-9]\d*)?$/,
    };

    /**
     * 正则验证
     * @type {{isURL: (function(string): boolean)}}
     */
    static regex = {
        isURL(url: string): boolean {
            let strRegex = '^((https|http|ftp|rtsp|mms)://)'
                + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
                + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
                + '|' // 允许IP和DOMAIN（域名）
                + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
                + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
                + '[a-z]{2,6})' // first level domain- .com or .museum
                + '(:[0-9]{1,5})?' // 端口- :80
                + '((/?)|' // a slash isn't required if there is no file name
                + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
            let re = new RegExp(strRegex);
            return re.test(url);
        },

        //获取正文邮件(你好<abc123@123.com> = abc123@123.com)
        getMail (mail: string): string {
            return (new RegExp(/<(.+?)>/g).exec(mail) || [, mail])[1]
        }
    }

};

global.xt = xt;
