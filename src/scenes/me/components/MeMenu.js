/* @flow */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListMenu} from '../../../components/list';
import {mainColors} from './../../../styles/main.css';

export default ({store}) =>(
    <View style={styles.menuContainer}>
        <ListMenu data={store.sections} onPress={store.onMenuPress} bottomLine/>
    </View>
);

const styles = StyleSheet.create({
    menuContainer: {
        flex: 4,
        backgroundColor: "#fff"
    },

    listContainer: {
        borderTopWidth: 0,
    },

    listItemContainer: {
        borderBottomColor: '#C9C8CD',
        borderBottomWidth: 0.5,
        paddingTop: 8,
        paddingRight: 12,
        paddingBottom: 8,
    },

    listItemWrapper: {
        marginLeft: -3,
    }
});