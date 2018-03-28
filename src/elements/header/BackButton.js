/* @flow */

import React from 'react';
import {Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default (state) => {
    if( state.hideBack) return;

    let back = state.onLeft || Actions.pop;
    let color = state.backColor || '#000';
    const asset = require('../../assets/icons/back-icon.png');
    return (
        <View style={styles.container}>
            <TouchableOpacity
                delayPressIn={0}
                delayPressOut={0}
                onPress={back}
                style={styles.containerBack}
            >
                <Image style={styles.icon} source={asset} />
            </TouchableOpacity>
            { Platform.OS === 'android' && !state.titleCenter? <View style={[styles.line, {borderColor: color}]}/>: null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    containerBack: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40
    },

    icon: {
        tintColor: '#fff',
    },
    line: {
        borderRightWidth: StyleSheet.hairlineWidth,
        height: 20,
        width: 1,
        borderStyle: "solid",
    }
});