/* @flow */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {mainColors, mainStyles} from './../../../styles/main.css';
import coreStyles from '../../../styles/core.css'
import xt from '../../../extension';

export default ({store}) => (
    <View style={styles.userInfo}>
        <View style={styles.userInfoLine}/>
        <View style={[styles.userInfoContainer, coreStyles.shadow]}>
            <View style={mainStyles.row}>
                <Text style={mainStyles.colTitle1}>所属公司</Text>
                <Text style={mainStyles.colContent1}>{xt.data.user.companyName}</Text>
            </View>
            <View style={mainStyles.row}>
                <Text style={mainStyles.colTitle1}>担任职务</Text>
                <Text style={mainStyles.colContent1}>{xt.data.user.positnName}</Text>
            </View>
        </View>
    </View>
);


const styles = StyleSheet.create({

    userInfoLine: {
        backgroundColor: mainColors.user.containerBack,
        height: 28, position: 'absolute', left: 0, right: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },

    userInfo: {
        paddingBottom: 5,
        paddingHorizontal: 8,
    },

    userInfoContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10
    },

    userContainer: {
        backgroundColor: mainColors.user.containerBack,
        height: 240,
        paddingTop: 14,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    }
});