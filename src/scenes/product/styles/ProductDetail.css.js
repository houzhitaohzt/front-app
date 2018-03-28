/**
 * @author tangzehua
 * @sine 2017-09-01 11:25
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColors.mainBack,
        paddingVertical: 3,
    },

    description: {
        paddingVertical: 4,
        backgroundColor: '#fff',
        paddingLeft: 16,
        // minHeight: 35,
        lineHeight:24
    },
    useTxtContent:{
        backgroundColor:"#fff",
        paddingHorizontal:16,
        paddingTop:0,
        paddingBottom:8,
        flexDirection:"row",
        flexWrap:'wrap'
    },
    useTxtSingle:{
        borderRadius:18,
        backgroundColor:"#eeeeee",
        paddingHorizontal:10,
        paddingVertical:6,
        marginHorizontal:8,
        marginVertical:5,
    },
    useTex:{
        color:'black',
        fontSize:12
    }
});