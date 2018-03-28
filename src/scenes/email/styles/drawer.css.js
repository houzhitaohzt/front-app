import {StyleSheet} from 'react-native';
import {mainColors} from '../../../styles/main.css';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColors.subBack,
    },

    titleText: {
        color: mainColors.mainText,
        fontSize: 16,
    },

    itemFeedback: {
        borderColor: mainColors.mainLine,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 63,
    },

    itemBottom: {
        borderColor: '#EFEFF3',
        borderBottomWidth: 10,
        marginLeft: 0,
    },

    titleView: {
        height: 40,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: mainColors.mainLine,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth
    },

    mailList: {
        position: 'absolute',
        top: 40, left:0, right: 0, bottom: 0,
    },

    mailListView: {
        backgroundColor: '#fff',
        maxHeight: 240,
    },

    mask: {
        position: 'absolute',
        top: 0, bottom: 0, right: 0,left: 0,
        backgroundColor: '#000',
        opacity: 0.3
    },

    listItemContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        paddingLeft: 12,
        paddingTop: 8,
        paddingRight: 12,
        paddingBottom: 8,
    },

    listItemWrapper: {
        marginLeft: -3,
    },

    subtitle: {
        color: '#686868',
        fontSize: 12,
        fontWeight: '100',
    },

    rightTitleContainer: {
        justifyContent: 'flex-start',
        width: 70,
        flex: 0,
    },

    rightTitle: {
        marginRight: 0,
        fontSize: 12,
    },

    badgeContainer: {
        backgroundColor: 'transparent',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 1
    },

    badgeText: {
        fontSize: 17,
        color: mainColors.sub1Text
    },

    titleStyle: {
        fontSize: 15,
    },

    svgIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 18,
    }

});