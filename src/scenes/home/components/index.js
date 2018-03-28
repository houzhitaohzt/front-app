/* @flow */
import React from 'react';
import {Image, View, StyleSheet, Text, Platform, ScrollView, InteractionManager, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import {mainColors, mainStyles} from './../../../styles/main.css';
import homeStore , {TopMenuStore} from './../store/HomeStore';
import topMenuStore from './../store/TopMenuStore';
import SvgIcon from '../../../components/icons/SvgIcon';
import xt from '../../../extension';

import TopMenu from './TopMenu';
import ControlMenu from './ControlMenu';
import BottomMenu from './BottomMenu';

export const renderTitle = props => (
    <Image
        resizeMode="contain"
        source={require("./../../../assets/images/noohle_logo.png")}
        style={styles.title}
    />
);

export const renderRight = props => (
    <TouchableOpacity style={[mainStyles.topNavRight, {width: 60}]} onPress={topMenuStore.onMailPress}>
        <SvgIcon name='h-mail' width={25} height={16}/>
    </TouchableOpacity>
);

@observer
export default class extends React.Component {

    constructor (props) {
        super(props);
        this.topStore = topMenuStore;
        this.store = homeStore;
    }

    componentDidMount () {
        let store = this.store;
        store.init();
        InteractionManager.runAfterInteractions(()=> {
            store.autoMail();
            store.paging.fetchFirst({}, null, xt.ui.showEToast);
        });
    }

    componentWillUnmount() {
        this.store.dispose();
    }

    render = () => (
        <ScrollView style={styles.container} alwaysBounceVertical={false}>
            <TopMenu store={this.topStore}/>
            <ControlMenu store={this.store}/>
            <BottomMenu store={this.store}/>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFEFF3",
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    title: {
        height: 18,
        alignSelf: 'center',
        ...Platform.select({
            android: {
                marginLeft: 60
            }
        })
    }
});