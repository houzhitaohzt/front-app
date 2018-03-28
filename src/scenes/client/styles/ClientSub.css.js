/**
 * @author tangzehua
 * @sine 2017-08-29 10:33
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 5,
        paddingBottom:6
    },

    contentsingle:{
        alignItems: 'center',
        flexDirection: 'row'
    },
    left: {
        flex: 1,
        paddingRight: 15
    },
    rightText: {
        // paddingRight: 10
    },
    //图片的样式
    iconImg : {
        width:14,
        height:14,
        marginTop:3
    },
    text:{
        fontSize:14,
        color:mainColors.sub1Text,
        paddingLeft:10
    }
});