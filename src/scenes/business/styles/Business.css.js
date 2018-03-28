/**
 * @author tangzehua
 * @sine 2017-08-29 10:33
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({
    itemRow:{
        paddingBottom:5,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
    },
    contentSingle:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignContent:'center'
    },
    text:{
        fontSize:14,
        color:mainColors.sub1Text,
        paddingVertical:1
    }
});