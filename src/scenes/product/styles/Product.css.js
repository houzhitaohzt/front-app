/**
 * @author tangzehua
 * @sine 2017-08-29 10:33
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColors.mainBack,
    },
    //第二级的title
    twosay:{
        height: 40,
        fontSize:14,
        color:mainColors.sub1Text,

        lineHeight:20
    },
    //第三层的样式
    threemore:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingBottom:6
    },
    threemoreone:{
        color:mainColors.sub1Text,
        fontSize:14
    }


});