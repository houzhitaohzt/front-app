/**
 * @author tangzehua
 * @sine 2017-08-23 16:09
 */

import {StyleSheet} from 'react-native';
import {constant, mainColors} from '../../../styles/main.css';

export default StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,
    },

    titleContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: mainColors.mainLine
    },

    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: constant.tabBarHeight,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: mainColors.mainLine,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        backgroundColor: '#FAFAFA',
    },

    bottomItemText: {
        fontSize: 10,
        padding: 2,
        color: mainColors.mainText,
    },

    bottomItem: {
        width: 100,
        paddingTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    detailContainer: {
        flex: 1,
    },

    titleMain: {
        color: mainColors.mainText,
        fontSize: 16,
    },

    detailSlot: {
        paddingTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    detailSlot2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    titleDetail: {
        flexDirection: 'row',
        paddingTop: 6,
    },

    titleSub: {
        color: mainColors.sub1Text,
        fontSize: 14,
    },

    titleSub2: {
        minWidth: 50,
        paddingRight: 4,
        color: mainColors.sub1Text,
        fontSize: 14,
    },

    titleSub3: {
        flex: 1,
        color: mainColors.mainText,
        fontSize: 14
    },

    titleTime: {
        color: mainColors.sub1Text,
        fontSize: 14
    },

    titleBtn: {
        fontSize: 14,
        color: mainColors.primary1,
        marginLeft: 16,
    },

    webView: {
        minHeight: 200,
        flex:1,
        paddingLeft: 5,
        // padding: 5
    },


    //fileDown 样式
    fileContainer: {
        // paddingLeft:16,
    },
    fileSingle:{
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        height:45,
        borderBottomColor:mainColors.mainLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingLeft:16
    },
    fileIcon: {
        width:32,
        height:32,
        borderRadius:6,
        padding:5,
        marginRight:5,
        justifyContent:'center',
        alignItems:'center'
    },
    fileSays:{
        flex:1,
    },
    fileTitle:{
        fontSize:14,
        color:mainColors.mainText
    },
    fileSize:{
        fontSize:10,
        color:mainColors.sub1Text
    },
    fileDown:{
        width:22,
        height:38,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight:16,
    },
    icons:{
      width:22,
      height:22,
      borderRadius:11,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:mainColors.mainLine,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    allFile:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        height:45,
        paddingLeft:16,
        borderBottomColor:mainColors.mainLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});