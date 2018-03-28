/**
 * @author tangzehua
 * @sine 2017-08-30 11:45
 */

import {StyleSheet, Platform} from 'react-native';
import {mainColors} from './main.css';

export default StyleSheet.create({

    //通用列表item
    listItem: {
        flex: 1,
        backgroundColor: mainColors.rowBack,
        // backgroundColor: "#fff",
        // marginHorizontal: 10,
        paddingHorizontal:8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2
    },

    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2
    },

    listItemV: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    listItemT:{
        marginVertical:6,
        fontSize:16,
        color:mainColors.primary1,
    },

    searchContainer: {
        backgroundColor:"#d3d3d8",
        // backgroundColor:"#c9c9ce",
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },

    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 5,
        color: mainColors.mainText
    },
});