/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-11 17:59
 */
import React from 'react';
import {View, StyleSheet, Text, Easing, TouchableOpacity, TextInput, Platform} from 'react-native';
import {observer} from 'mobx-react/native';
import Modal from '../../../elements/modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {mainColors, mainStyles} from '../../../styles/main.css';
import xt from '../../../extension'
import DeviceInfo from "../../../extension/native/DeviceInfo";

export default observer(({ store }) => (
    <Modal coverScreen={false} style={{backgroundColor: 'rgba(0,0,0,0)'}}
           backdrop={true} swipeToClose={true} animationDuration={200} position='top'
           ref={rf => store.modal = rf} >
        <TouchableOpacity style={{flex: 1}} onPress={store.closeDev}/>
        <View style={styles.container}>
            <Text style={mainStyles.hidden}>{store.refresh}</Text>
            <Text style={{textAlign:'center',fontSize:18}}>{Platform.OS + "=>" + Platform.Version}: {DeviceInfo.getVersion() + "  "}
                RN: {xt.data.config.version}</Text>
            <TouchableOpacity onPress={store.openHost}>
                <View style={styles.detailhost}>
                    <Text style={styles.showtext}>{xt.data.host}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={store.openPort}>
                <View style={styles.detailhost}>
                    <Text style={styles.showtext}>{xt.data.uri.name || '点击选择'}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.detailhost}>
                <TextInput
                    style={styles.inputvl}
                    underlineColorAndroid="transparent"
                    placeholder="点击输入用于本地输入测试"
                    defaultValue={xt.data.uri.value || ''}
                    placeholderTextColor="#bbbbbb"
                    onChangeText={store.onUriInput}
                    clearButtonMode="while-editing"
                    editable={!xt.isEmpty(xt.data.uri.name)}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                />
            </View>
        </View>
        <TouchableOpacity style={{flex: 1}} onPress={store.closeDev}/>
    </Modal>
))

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        padding:20
    },
    showtext:{
        fontSize:18,
        textAlign:'center',
    },
    detailhost:{
        height:30,
        paddingHorizontal:2,
        borderRadius:3,
        borderWidth:1,
        borderColor:mainColors.sub1Text,
        justifyContent:'center',
        marginTop:5
    },
    inputvl:{
        height: 30,
        padding:0,
        color:mainColors.mainText,
        fontSize:18,
        textAlign:'center'
    }
});