/**
 * @author tangzehua
 * @sine 2017-08-29 10:33
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({
    itemRow:{
        paddingBottom: 5,
    },
    itemsingle:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:6,
    },
    text:{
        color:mainColors.sub1Text,
        fontSize:14
    }
});