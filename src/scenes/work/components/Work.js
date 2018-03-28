/* @flow */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {observer} from 'mobx-react/native';
import {mainColors} from './../../../styles/main.css';
import {ListMenu} from '../../../components/list';
import workStore from '../store/WorkStore';

@observer
export default class extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount () {
        workStore.init();
    }

    render(){
        return (<View style={styles.container}>
            <ListMenu sections={workStore.sections} onPress={workStore.onCMenuPress}/>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFEFF4",
    }
});