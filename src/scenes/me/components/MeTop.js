/* @flow */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react/native';
import Avatar from './../../../elements/avatar/Avatar';
import {mainColors} from './../../../styles/main.css';
import xt from '../../../extension';


export default observer(({store})=>(
    <View style={styles.userContainer}>
        <Text style={styles.userTitle}>{xt.data.user.staffName}</Text>
        <View style={styles.userAvatar}>
            <Avatar
                width={70}
                rounded
                source={require('../../../assets/avatar/3.jpg')}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
            />
        </View>
        <TouchableOpacity style={styles.btnKaoQing} onPress={store.onCheckWork}>
            <Text style={styles.btnText}>退出登录</Text>
        </TouchableOpacity>
    </View>
));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    userTitle: {
        color: '#fff',
        fontSize: 20,
    },

    btnText: {
        color: '#fff',
    },

    btnKaoQing: {
        marginTop: 5,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 15,
    },

    userAvatar: {
        marginVertical: 10,
        borderColor: '#88BEF2',
        borderWidth: 3,
        borderRadius: 100
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