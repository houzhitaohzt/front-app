import React from 'react';
import {Platform, View} from 'react-native';
import KeyboardSpacer from './KeyboardSpacer';


function getIOSSpacer (props){
    return Platform.OS === 'ios'? <KeyboardSpacer {...props}/>: null
}
export {
    KeyboardSpacer,
    getIOSSpacer
}