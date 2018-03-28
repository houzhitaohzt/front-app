/**
 * @author tangzehua
 * @sine 2017-08-11 16:36
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({

    listLine: {
        backgroundColor: mainColors.mainLine,
        height: StyleSheet.hairlineWidth + 0.1,
        marginLeft: 60,
    },

    avatar: {
        width: 40,
        height: 40,
        marginTop: 4,
        borderRadius: 40,
        marginRight: 10,
        borderColor: mainColors.primary1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        color: mainColors.primary1,
        fontSize: 17,
    },

    item: {
        height: 70,
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
    },

    mailTitle: {
        fontSize: 16,
        borderWidth: 0,
        padding: 0,
        margin: 0,
        color: mainColors.mainText,
        marginBottom: 2,
        flex: 1,
    },

    list1: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },

    vIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 50,
    },

    vIcon2 : {
        padding: 2,
    },

    mailTime: {
        fontSize: 12,
        color: '#b8b8b8'
    },

    subTitle: {
        flex: 1,
        fontSize: 14,
        color: mainColors.sub1Text,
    },

    replayIcon: {
        width: 8,
        height: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4,
        backgroundColor: mainColors.primary1
    }
});