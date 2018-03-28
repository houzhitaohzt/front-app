/**
 * 路由控制器
 * @flow
 */
import React from "react";
import {StyleSheet, StatusBar, Platform, View, Text, Animated, Easing,} from 'react-native';
import {observer} from 'mobx-react/native';
import {Reducer, Router, Scene, ActionConst, Actions, Stack} from "react-native-router-flux";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import BackButton from './../elements/header/BackButton';
import appStore from './../app/AppStore';
import Common from './../extension/native/Common';
import {mainColors, constant} from './../styles/main.css';
import xt from '../extension';

import HomeRouter from "./Home";
import SubRouter from './Sub';
import EmailRouter from './Email';

type Props = {
    initKey: string
}

const changeStatusBar = (state: Object, name: string) => {
    let scene = RouterConfig[name]
        || RouterConfig[name.replace("_", '')]
        || RouterConfig[`${state.routes[state.index].routeName}`];
    appStore.setStatusBar(!scene || {
        visible: scene.statusBar,
        barStyle: scene.barStyle,
    });
};

const reducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        if (action.type === ActionConst.FOCUS) {
            changeStatusBar(state, action.routeName);
        }
        return defaultReducer(state, action);
    };
};

const backAndroidHandler = () => {
    if(!xt.ui.isLoading()){
        if (Actions.currentScene === '_homeIndex') {
            Common.moveToBack();
        }else if(Actions.currentScene === 'login'){
            Common.exitApp();
        } else {
            Actions.pop();
        }
    }
    return true;
};

const getSceneStyle = () => ({
    backgroundColor: '#e9e9ef',
    shadowColor: '#000',
    shadowOffset: {
        width: 1,
        height: 1
    },
    shadowOpacity: xt.isIphoneX()? 0: 0.3,
    shadowRadius: 3,
    elevation: 5,
});

const RouterConfig = {
    "login": {
        statusBar: false,
        barStyle: 'dark-content',
    },
    "homeWelcome": {
        statusBar: true,
    },
    "home": {statusBar: false}
};

export default observer(props => (
    <Router
        createReducer={reducerCreate}
        getSceneStyle={getSceneStyle}
        backAndroidHandler={backAndroidHandler}
        backColor={mainColors.backLine}
        renderLeftButton={BackButton}
    >
        <Stack
            key="root"
            hideTabBar
            headerMode="screen"
            headerStyle={styles.headerStyle}
            headerTitleStyle={styles.headerTitleStyle}
            tintColor={mainColors.headerTitle}
            transitionConfig={() => ({
                screenInterpolator: CardStackStyleInterpolator.forHorizontal,
                transitionSpec: {duration: 150, timing: Animated.timing, easing: Easing.ease }
            })}
        >
            {[
                HomeRouter(props),
                ...EmailRouter(props),
                ...SubRouter(props)
            ]}
        </Stack>
    </Router>
))

const styles = StyleSheet.create({

    headerStyle: {
        backgroundColor: mainColors.headerBack,
        paddingTop: constant.statusHeight,
        height: constant.headerHeight,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: mainColors.headerBack + "99",
        elevation: 0,
        shadowRadius: 0,
    },

    headerTitleStyle: {
        fontSize: constant.headerFontSize,
        fontWeight: 'normal',
        ...Platform.select({
            android: {
                fontFamily: 'sans-serif',
            }
        }),
        marginHorizontal: 0,
        color: mainColors.headerTitle,
    }

});