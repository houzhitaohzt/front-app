/**
 * @author tangzehua
 * @sine 2017-09-19 16:56
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({
    topNavRight: {
        flex: 1,
        flexDirection: 'row',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    listItem: {
        minHeight: 50,
        paddingVertical: 5,
        paddingHorizontal: 12,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
    },

    listLine: {
        marginLeft: 44,
        height: StyleSheet.hairlineWidth,
        backgroundColor: mainColors.mainLine,
    },

    checkView: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mainColors.primary2,
        borderRadius: 26,
        height: 22,
        width: 22,
    },

    nCheckView: {
        backgroundColor: '#fff',
        borderWidth: 0.6,
        borderColor: mainColors.mainLine
    },

    subView: {
        flex: 1,
        justifyContent: 'space-around'
    }
});