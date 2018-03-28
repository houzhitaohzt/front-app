/**
 * 主界面导航
 * @flow
 */
import React from "react";
import {StyleSheet, Platform} from "react-native";
import Icons from 'react-native-vector-icons/FontAwesome';
import {Scene, Tabs, Stack} from "react-native-router-flux";
import {constant, mainColors} from './../styles/main.css';

import HomeScene, {renderTitle as renderHomeTitle, renderRight as renderHomeRight} from "./../scenes/home";
import MeScene from './../scenes/me';
import WorkScene from './../scenes/work';
import ImScene from './../scenes/im';

const tabIcon = (name: string, focused: string, tintColor: string) => (
    <Icons name={name} size={22} color={tintColor}/>
);

const welcomeIcon = ({focused, tintColor}) => tabIcon("snapchat-ghost", focused, tintColor);
const homeIcon = ({focused, tintColor}) => tabIcon("home", focused, tintColor);
const imIcon = ({focused, tintColor}) => tabIcon("commenting-o", focused, tintColor);
const workIcon = ({focused, tintColor}) => tabIcon("windows", focused, tintColor);
const meIcon = ({focused, tintColor}) => tabIcon("user-o", focused, tintColor);

type Param = {
    initKey: string
}

export default (props: Param) => (
    <Tabs
        key="home" lazy={false} hideNavBar
        tabBarStyle={styles.tabBarStyle}
        tabStyle={styles.tabStyle}
        labelStyle={styles.labelStyle}
        iconStyle={styles.iconStyle}
        indicatorStyle={styles.indicatorStyle}
        headerTitleStyle={styles.headerTitleStyle}
        tabBarPosition="bottom"
        headerMode="screen"
        swipeEnabled={true}
        animationEnabled={false}
        scrollEnabled={false}
        showLabel={true}
        showIcon={true}
        gesturesEnabled={true}
        activeTintColor={mainColors.home.tabsActiveTint}
        inactiveTintColor={mainColors.home.tabsInactiveTint}
        pressColor="#eee"
        // tabBarComponent={TabBarBottom}
        initial={props.initKey === 'home'}
        hideBack
        statusBar={false}
        duration={0}
    >
        {/*<Stack tabBarIcon={welcomeIcon} key="homeWelcome" tabBarLabel="欢迎" component={require('./../scenes/welcome').default} hideNavBar/>*/}
        <Stack tabBarIcon={homeIcon} key="homeIndex" tabBarLabel="首页" component={HomeScene} renderTitle={renderHomeTitle} initial right={renderHomeRight}/>
        {/*<Stack tabBarIcon={imIcon} key="homeIm" title="消息" tabBarLabel="消息" component={ImScene}/>*/}
        <Stack tabBarIcon={workIcon} key="homeWork" title="工作台" tabBarLabel="工作台" component={WorkScene}/>
        <Stack tabBarIcon={meIcon} key="homeMe" tabBarLabel="我的" component={MeScene} hideNavBar/>
    </Tabs>
);

const styles = StyleSheet.create({

    tabBarStyle: {
        borderTopWidth: 0,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        // borderTopColor: '#fff',
        backgroundColor: '#F4F5F7',
    },

    labelStyle: {
        fontSize: 10,
        margin: 0,
    },

    iconStyle: {
        width: 30,
        height: 30,
    },

    tabStyle: {
        height: constant.tabBarHeight,
        paddingTop: 0,
        padding: 0,
    },

    indicatorStyle: {
        height: 0,
    },

    headerTitleStyle: {
        fontSize: constant.headerFontSize,
        color: mainColors.headerTitle,
        fontWeight: 'normal',
        ...Platform.select({
            android: {
                fontFamily: 'sans-serif',
            }
        }),
        marginHorizontal: 0,
        alignSelf: 'center',
    }

});
