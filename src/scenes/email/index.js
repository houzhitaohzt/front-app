import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import drawerStore from './store/DrawerStore';
import {mainStyles} from '../../styles/main.css';

import * as Receive from './components/receive';
import * as Detail from './components/detail';
import * as Write from './components/write';
import * as Contact from './components/contact';

export {
    Receive,
    Detail,
    Write,
    Contact
}

export {default as Drawer} from './components/drawer';
export {default as Remove} from './components/remove';
export {default as Sent} from './components/sent';
export {default as Dustbin} from './components/dustbin';
export {default as Search} from './components/search';

export function renderTitle (state) {
    if( !state.children) return;
    let currentScene;
    for (let i = 0, j = state.children.length; i < j; i++){
        let scene = state.children[i];
        if(("_" + scene.key) === Actions.currentScene){
            currentScene = scene;
            break;
        }
    }

    if(currentScene ){
        if(currentScene.props.renderTitle) {
            return currentScene.props.renderTitle(currentScene.props);
        } else {
            return (
                <View style={{alignSelf: 'center'}}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>{currentScene.props.title}</Text>
                    </View>
                    <Text style={styles.cMail}>{drawerStore.currentMail}</Text>
                </View>
            )
        }
    }
    return <Text style={styles.otherTitle}>{state.title}</Text>
}

export function renderRightButton(state){
    let nullDom = <View style={styles.hidden}/>;
    if( !state.children) return nullDom;
    let currentScene;
    for (let i = 0, j = state.children.length; i < j; i++){
        let scene = state.children[i];
        if(("_" + scene.key) === Actions.currentScene){
            currentScene = scene;
            break;
        }
    }

    if(currentScene ){
        let right = null;
        if(currentScene.props.right) {
            right = currentScene.props.right(currentScene.props);
        }

        return (
            <View style={mainStyles.topNavRightV}>
                {right}
                <TouchableOpacity style={mainStyles.topNavRight} onPress={onDrawer}>
                    <Image source={require('../../assets/icons/mail-menu.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
    return nullDom;
}

const onDrawer = ()=>{
    Actions.currentScene === 'DrawerOpen'
        ? drawerStore.onCloseDrawer()
        : drawerStore.onOpenDrawer();
};
/*
export function renderLeftButton (state){
    if( state.hideBack || Actions.currentScene === state.backRouteName) return;
    const asset = require('../../assets/icons/back-icon.png');
    return (
        <View style={styles.leftButton}>
            <TouchableOpacity
                delayPressIn={0}
                delayPressOut={0}
                onPress={()=>this.requestAnimationFrame(state.onLeft || Actions.pop)}
                style={styles.touchView}
            >
                <Image style={styles.iconImg} source={asset} />
            </TouchableOpacity>
            <TouchableOpacity
                delayPressIn={0}
                onPress={ onDrawer }
                style={styles.touchView}
            >
                {<Icon name="align-left" color="#fff" size={16} style={styles.icon}/>}
            </TouchableOpacity>
        </View>
    );
}
*/

const styles = StyleSheet.create({

    /*leftButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 70,
        flex: 1,
    },

    touchView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    */
    iconImg: {
        tintColor: '#fff',
    },
    titleView:{
        flex: 2.5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        paddingBottom: 4,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    otherTitle: {
        color: '#fff',
        fontSize: 15,
        alignSelf: 'center',
        marginRight: 0,//leftbutton
    },
    title: {
        color: '#fff',
        paddingRight: 5,
        fontSize: 15,
    },

    cMail: {
        flex: 1,
        fontSize: 9,
        color: '#fff',
        marginTop: 0,
        lineHeight: 9,
        textAlign:'center'
    }

});