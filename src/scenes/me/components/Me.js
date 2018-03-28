/* @flow */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react/native';
import meStore from './../store/MeStore';

import MeInfo from './MeInfo';
import MeTop from './MeTop';
import MeMenu from './MeMenu';

export default observer(props =>(
    <View style={styles.container}>
        <MeTop store={meStore}/>
        <MeInfo store={meStore}/>
        <MeMenu store={meStore}/>
    </View>
));


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});