/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-15 15:15
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TagView} from '../../../components/ui';
import {observer} from 'mobx-react/native';
import {TagInput} from "../../../elements/input";
import styles from './../styles/welcome.css';

@observer
export default class Demo extends React.Component {

    render() {
        let store = this.props.store;
        return (
            <View style={styles.template}>
                <View style={styles.row}>
                    <Text style={styles.colTitle}>TagInput:</Text>
                    <TagInput keyboardType={'email-address'} parseOnBlur fold value={["stulip@126.com"]}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.colTitle}>Normal Select:</Text>
                    <TouchableOpacity onPress={store.onNormalSelect} style={styles.colValue2}>
                        <Text c1>{store.normalSelectValue && store.normalSelectValue.label}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.colTitle}>List Select:</Text>
                    <TouchableOpacity onPress={store.onListSelect} style={styles.colValue2}>
                        <TagView data={store.listSelectValue} uniqueKey='id' labelKey='localName' placeholder='点击选择'/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}