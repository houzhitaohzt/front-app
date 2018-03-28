/**
 *
 * @flow
 */

import {
    StyleSheet, Platform
} from 'react-native';

export default StyleSheet.create({

    //笼罩层
    mask: {
        backgroundColor: '#000',
        opacity: 0.3,
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0
    },

    container: {
        flex: 1,
        backgroundColor: '#EFEFF4',
    },

    //隐藏元素
    hidden: {
        ...Platform.select({
            android: {
                display: 'none',
            },
            ios: {
                position: 'absolute',
                top: -2200,
            }
        })
    },

    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    //导航条右边单个按钮
    topNavRight: {
        flex: 1,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    topNavRightV: {
        flex: 1,
        flexDirection: 'row'
    },

    row: {
        flexDirection: 'row',
        paddingVertical: 2,
    },

    colTitle1: {
        width: 80, color: '#3B98EC',
    },

    colContent1: {
        flex: 1, color: '#454557'
    }
});