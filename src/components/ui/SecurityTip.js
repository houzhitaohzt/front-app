/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-27 15:51
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SvgIcon from '../icons/SvgIcon';
import {mainColors} from '../../styles/main.css';


export default class SecurityTip extends React.PureComponent {

    render() {
        return (
            <View style={styles.container}>
                <SvgIcon name='no-sec' size={100}/>
                <Text style={styles.emptyText}>无权限访问</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,
        alignItems: 'center',
    },

    emptyText: {
        paddingTop: 10,
        fontSize: 14,
        color: mainColors.sub2Text
    },

    listLine: {
        height: 8,
        backgroundColor: 'transparent'
    }
});