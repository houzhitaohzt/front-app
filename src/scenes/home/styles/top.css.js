/**
 * @author tangzehua
 * @sine 2017-08-14 10:18
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: '#fff',
        // marginTop: 10,
    },

    badgeWrapper: {
        position: 'absolute',
        top: 0,
        right: 28,
    },

    badgeText: {
        fontSize: 10,
        fontWeight: 'bold'
    },

    badgeContainer: {
        padding: 4.5,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'red',
        borderColor: '#fff',
        borderWidth: 1.5,
    },

    svgIcon: {
        backgroundColor: mainColors.iconBack,
        width: 58,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 10,
    },

    menuContainer: {
        flex: 1,
        paddingVertical: 10
    },

    menu: {
        flex: 1,
        alignItems: 'center',
    }
});