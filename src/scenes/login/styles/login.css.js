/**
 * @author tangzehua
 * @sine 2017-08-23 15:20
 */

import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({
    container: {
        flex: 3,
        // backgroundColor: mainColors.mainBack,
        backgroundColor: "#F0EFF3",
    },
    logo: {
        alignItems: 'center',
        paddingTop: 83,
        paddingBottom: 50,
    },
    logo2: {
        marginTop: 10
    },
    userView: {
        position: 'relative',
        marginBottom: 26,
        marginLeft: 20,
        marginRight: 20,
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#d9d8dd",
        paddingBottom: 5,
    },
    userDeleteIcon: {
        position: 'absolute',
        right: 0,
        top: 6
    },
    passwordView: {
        position: 'relative',
        marginBottom: 32,
        marginLeft: 20,
        marginRight: 20,
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#d9d8dd",
        paddingBottom: 5,
    },
    passwordDeleteIcon: {
        position: 'absolute',
        right: 30,
        top: 6
    },
    viewIcon: {
        position: 'absolute',
        right: 0,
        top: 3
    },
    userInput: {
        height: 30,
        padding: 0,
        color: mainColors.mainText,
        fontSize: 16
    },
    passwordsInput: {
        padding: 0,
        height: 30,
        color: mainColors.mainText,
        fontSize: 16,
    },
    forget: {
        alignItems:'flex-end',
        marginLeft:20,
        marginRight:20,
        marginTop:12,
    },
    footer: {
        alignItems:'flex-end',
    }
});