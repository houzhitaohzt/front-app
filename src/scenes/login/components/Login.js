/**
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput, StatusBar,
    AppRegistry, Image, TouchableWithoutFeedback
} from 'react-native';
import {observer} from 'mobx-react/native';
import Button from '../../../elements/buttons';
import SvgIcon from "../../../components/icons/SvgIcon";
import loginStore from './../store/LoginStore';
import devStore from '../store/DevStore';
import xt, {Api} from './../../../extension';

import {mainColors} from '../../../styles/main.css';
import styles from '../styles/login.css';
import Dev from './Dev';

const Container = observer(({store}) => {
    return (
        <View style={styles.container}>
            <View style={styles.userView}>
                <TextInput
                    style={styles.userInput}
                    underlineColorAndroid="transparent"
                    placeholder="请输入邮箱/怒吼账号"
                    placeholderTextColor="#bbbbbb"
                    defaultValue={store.userName}
                    keyboardType="email-address"
                    onChangeText={store._onNameInput}
                    clearButtonMode="while-editing"
                    autoCapitalize={'none'}
                    autoCorrect={false}
                />
            </View>
            <View style={styles.passwordView}>
                <TextInput
                    style={styles.passwordsInput}
                    underlineColorAndroid="transparent"
                    placeholder="请输入密码"
                    placeholderTextColor="#bbbbbb"
                    secureTextEntry={true}
                    defaultValue={store.passWord}
                    onChangeText={store._onPasswordInput}
                    clearButtonMode="while-editing"
                    enablesReturnKeyAutomatically={true}
                />
            </View>
            <Button backgroundColor={mainColors.primary3} borderRadius={8} fontSize={18} title="登录" color="#fff"
                    onPress={store.login} buttonStyle={{height: 48}}
                    disabled={store.validlogin}
                    disabledStyle={{backgroundColor:"rgba(0,118,255,0.2)"}}
            />
            <View style={styles.forget}>
                <Text style={{color: mainColors.sub2Text, fontSize: 14}} onPress={store.forgetTip}>忘记密码</Text>
            </View>
            <View style={{flex: 1}}/>
            <Image source={require("../../../assets/images/login_foot.png")} style={{width: '100%'}} />
        </View>
    )
});

export default class extends React.Component {

    constructor(props) {
        super(props);
        loginStore.initLogin();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <TouchableWithoutFeedback onLongPress={devStore.openDev}>
                        <Image source={require("../../../assets/images/logo.png")}/>
                    </TouchableWithoutFeedback>
                    <Image source={require("../../../assets/images/noohle_logo2.png")} resizeMode="stretch" style={styles.logo2} />
                </View>
                <Container store={loginStore}/>
                <Dev store={devStore}/>
            </View>
        )
    }
}