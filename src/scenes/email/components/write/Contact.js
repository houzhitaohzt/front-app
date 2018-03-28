/**
 * 邮件联系人
 * @flow
 * @author tangzehua
 * @sine 2017-09-05 10:40
 */
import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Text} from '../../../../components/ui';
import {observer} from 'mobx-react/native';
import Icon from '../../../../elements/icons';
import MailInput from './MailInput';
import {mainColors, mainStyles} from '../../../../styles/main.css';
import styles from '../../styles/write.css';

const MoreInput = ({store, currentMail}) => (
    <View>
        <MailInput
            label="抄送"
            autoFocus={true}
            onFocus={store.moreFocus}
            onBlur={store.moreBlur}
            onPress={store.onAddCcAddress}
            value={store.formData.ccAddress || []}
            onChange={tx=> store.formData.ccAddress = tx}
        />
        <MailInput
            label="密送"
            onFocus={store.moreFocus}
            onBlur={store.moreBlur}
            onPress={store.onAddBccAddress}
            value={store.formData.bccAddress || []}
            onChange={tx=> store.formData.bccAddress = tx}
        />
        <View style={styles.cRow}>
            <Text c2 style={styles.explain}>发件人: </Text>
            <Text style={styles.explain}>{currentMail}</Text>
        </View>
    </View>
);

export default observer(({store, currentMail}) => (
    <View style={styles.contactContainer} v={store.forceUpdate}>
        <MailInput
            label="收件人"
            onPress={store.onAddToAddress}
            value={store.formData.toAddress || []}
            onChange={tx=> store.formData.toAddress = tx}
        />
        {
            store.moreInputVisible ? <MoreInput store={store} currentMail={currentMail}/> :
                <TouchableOpacity style={styles.cRow} activeOpacity={1} onPress={store.showMoreInput}>
                    <Text c2 style={styles.explain}>抄送/密送, 发件人: {currentMail}</Text>
                </TouchableOpacity>
        }

        <View style={styles.cRow}>
            <TextInput
                placeholder='主题'
                placeholderTextColor={mainColors.sub2Text}
                style={styles.input}
                autoCapitalize={'none'}
                autoCorrect={false}
                defaultValue={store.oneData.subject}
                onChangeText={tx=> store.formData.subject = tx}
                underlineColorAndroid={'transparent'}/>
        </View>
    </View>
));