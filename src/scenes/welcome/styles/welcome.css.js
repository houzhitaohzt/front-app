
import {StyleSheet, Dimensions} from 'react-native';
import {mainColors} from './../../../styles/main.css';

const {width: screenWidth} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    userAvatar: {
        marginVertical: 20,
        borderColor: '#88BEF2',
        borderWidth: 3,
        borderRadius: 100
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 12
    },
    bottomVersion: {
        backgroundColor: '#f9f9f9',
        height: 20,
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    template: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginTop: 10,
        flexWrap: 'wrap'
    },

    templateMenu: {
        width: screenWidth/ 3,
        height: screenWidth/ 12,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 20,
        // paddingVertical: 15,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: mainColors.mainLine
    },

    titleText: {
        color: mainColors.mainText,
        fontSize: 12,
    },

    swiperWrapper: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
    },

    slide1: {
        backgroundColor: '#000',
    },

    row: {
        marginLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        paddingVertical: 5,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: mainColors.mainLine,
    },

    colTitle: {
        fontSize: 12,
        width: 100,
        paddingRight: 4,
        textAlign: 'right',
        paddingVertical: 4,
    },

    colValue: {
        flex: 1
    },

    colValue2: {
        flex: 1, justifyContent: 'center'
    }
});