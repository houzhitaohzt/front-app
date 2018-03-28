/**
 * @author tangzehua
 * @sine 2017-08-31 11:57
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({

    container: {
        backgroundColor: '#fff',
    },

    editorContainer: {
        minHeight: 400,
        flex: 1,
    },

    contactContainer: {

    },

    cRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        paddingRight: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: mainColors.mainLine
    },

    explain: {
        paddingVertical: 8,
        paddingRight: 4,
    },

    tagInput: {
        paddingVertical: 4,
    },

    richText: {
        flex: 1,
        // minHeight: 350,
        // height: 350,
        // alignItems:'center',
        // justifyContent: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: 4
    },

    richBar: {
        height: 50,
        backgroundColor: '#F4F5F7'
    },

    input: {
        flex: 1,
        color: mainColors.mainText,
        height: 40,
        padding:0,
    },

    navView: {
        flex: 1,
        paddingHorizontal: 15,
        minWidth: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    original: {
        paddingVertical: 10,
        marginHorizontal: 5,
        minHeight: 200,
    },

    originalControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    originalLine: {
        flex:1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: mainColors.mainLine,
    },

    originalText: {
        paddingHorizontal: 10,
    },

    addIcon: {
        marginLeft: 5,
        borderRadius: 22,
        width: 18, height: 18,
        borderWidth:1,
        borderColor: mainColors.primary1
    }

});