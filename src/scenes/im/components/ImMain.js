/* @flow */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react/native';
import {mainColors, mainStyles} from './../../../styles/main.css';
import Search from './../../../elements/input/Search';
import {ListMenu} from '../../../components/list';
import imStore from './../store/ImStore'

export default observer(props => (
    <View style={mainStyles.container}>
        <Search
            placeholder="搜索..."
            placeholderTextColor="#bbbbbb"
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
            icon={{name: 'search', color: '#bbbbbb'}}
        />
        <ListMenu data={imStore.sections} onPress={imStore.onMessage}/>
    </View>
));

const styles = StyleSheet.create({

    searchContainer: {
        backgroundColor:"#d3d3d8",
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },

    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 5,
        color: mainColors.mainText
    }
});