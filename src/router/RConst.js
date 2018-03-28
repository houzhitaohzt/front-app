import React from 'react';
import {StyleSheet} from 'react-native';
import {constant, mainColors, mainStyles} from './../styles/main.css';

const styles = StyleSheet.create({
    tabBarStyle: {
        borderTopWidth: 0,
        backgroundColor: mainColors.headerBack
    },

    headerStyle: {
        backgroundColor: mainColors.headerBack,
        paddingTop: constant.statusHeight,
        height: constant.headerHeight,
        borderBottomWidth: 0,
        elevation: 0,
        shadowRadius: 0,
    },

    labelStyle: {
        fontSize: 15,
        margin: 3,
    },

    indicatorStyle: {
        backgroundColor: '#fff'
    }
});

const TopTabs = ()=> null;
TopTabs.defaultProps = {
    duration: 0,
    tabs: true,
    lazy: true,
    swipeEnabled: true,
    headerMode: 'screen',
    animationEnabled: false,
    scrollEnabled: true,
    gesturesEnabled: true,
    hideNavBar: false,
    tabBarPosition: 'top',
    tabBarStyle: styles.tabBarStyle,
    headerStyle: styles.headerStyle,
    labelStyle: styles.labelStyle,
    indicatorStyle: styles.indicatorStyle,
};

const HideNav = ()=> null;
HideNav.defaultProps = {
    headerStyle: mainStyles.hidden
};

export {
    HideNav,
    TopTabs
}