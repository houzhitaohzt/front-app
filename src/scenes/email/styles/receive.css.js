/**
 * @author tangzehua
 * @sine 2017-08-11 16:36
 */

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    title: {
        color: '#fff',
        paddingRight: 5,
        fontSize: 15,
    },
    titleView: {
        flex: 2.5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        paddingBottom: 4,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    cMail: {
        flex: 1,
        fontSize: 9,
        color: '#fff',
        marginTop: 0,
        lineHeight: 9,
        textAlign:'center'
    },

    actionsContainer: {
        backgroundColor: '#eee',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    quickView: {
        width: 60,
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },

    quickText: {
        color: '#fff',
        fontSize: 14
    },

    quickCView: {
        flex: 1,
    }
});