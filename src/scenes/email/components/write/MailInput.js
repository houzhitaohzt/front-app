/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-18 17:12
 */
import React from 'react';
import {View} from 'react-native';
import {Text} from '../../../../components/ui';
import Icon from '../../../../elements/icons';
import {TagInput} from '../../../../elements/input';
import {observer} from 'mobx-react/native';
import {action, observable} from 'mobx';
import {mainColors} from '../../../../styles/main.css';
import styles from '../../styles/write.css';

const hitSlop = {
    top: 20, left: 20, bottom: 20, right: 20
};

export default observer(({label, onPress, ...rest}) => (
    <View style={styles.cRow}>
        <Text c2 style={styles.explain}>{label}: </Text>
        <TagInput keyboardType='email-address' style={styles.tagInput} parseOnBlur fold regex='@' {...rest}/>
        <Icon onPress={onPress} name='add' size={16} type='material' color={mainColors.primary1} style={styles.addIcon} hitSlop={hitSlop}/>
    </View>
))