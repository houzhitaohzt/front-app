/**
 * @author tangzehua
 * @sine 2017-09-04 11:38
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../styles/main.css';

export default StyleSheet.create({
    container: {
        // backgroundColor: '#fff',
        // paddingLeft: 16,
        marginVertical: 1,
        paddingBottom: 5,
    },

    noTitle: {
        height: 5,
        backgroundColor: 'transparent'
    },

    line: {
        height: 4,
        paddingLeft: 16,
        backgroundColor: '#fff',
    },

    line2: {
        height: 4,
        paddingLeft: 16,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    line3: {
        height: 1,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: mainColors.mainLine
    },

    space: {
        height: 10,
        backgroundColor: 'transparent',
    },

    title: {
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        paddingVertical: 8
    },

    row: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 4,
        paddingRight: 16,
    },

    rowNull: {
        minHeight: 30,
        backgroundColor: '#fff',
    },

    col1: {
        width: 80,
        textAlign: 'right',
    },

    col2: {
        marginLeft: 16,
        flex: 1,
    }
});