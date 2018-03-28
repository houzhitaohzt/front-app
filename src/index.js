/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import {useStrict} from 'mobx';
import moment from 'moment';
require('moment/locale/zh-cn');

useStrict(true);
moment.locale('zh-cn');
if(!__DEV__){
    console.log = ()=> {};
    console.info = ()=> {};
    console.warn = ()=> {};
    console.error = ()=> {};
    console.debug = ()=> {};
    console.assert = ()=> {};
} else {
    console.ignoredYellowBox = [
        'Setting a timer',
        'Warning: PropTypes',
        'Warning: Cannot update during an existing state transition',
        'Warning: Failed prop type: Invalid prop `name` of value'
    ];
}

export {default} from './app';