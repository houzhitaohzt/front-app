/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-25 14:31
 */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import xt from '../../../../extension';
import {observer} from 'mobx-react';
import Touchable from '../../../../components/touchable';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SvgIcon from '../../../../components/icons/SvgIcon';
import styles from '../../styles/list.css';
import {mainColors} from '../../../../styles/main.css';

const ListItem = observer(({item, index, onPress}) => {
    let {
        id, sendMail, sendName, subject, followMark, containAttach,
        reTimes, sendTime, markRead,
    } = item;
    return (
        <Touchable
            key={id} index={index} style={styles.item}
            underlayColor={mainColors.touchBack2} onPress={onPress}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{(sendName || sendMail || '').substr(0, 1).toUpperCase()}</Text>
            </View>
            <View style={{flex: 1}}>
                <View style={styles.list1}>
                    {!markRead && item.box==='RECEIVE' ? <View style={styles.replayIcon}/> : null}
                    {
                        markRead && reTimes > 0 ?
                                <MaterialIcons name="reply" size={13} color={mainColors.primary1} style={{paddingRight: 2}}/>
                             : null
                    }

                    <Text style={styles.mailTitle} numberOfLines={1}>{sendName || sendMail}</Text>
                    <Text style={styles.mailTime} numberOfLines={1}>
                        {xt.date.formatCalendarNow(sendTime, {sameDay: 'LT', nextDay: '[明天]', lastDay: '[昨天]'})}
                    </Text>
                </View>
                <View style={styles.list1}>
                    <Text style={styles.subTitle} numberOfLines={2}>{subject}</Text>
                    {followMark ? <Icon name="star" color="#EC625D" style={styles.vIcon2}/> : null}
                    {containAttach ? <SvgIcon name="annex" size={12} style={styles.vIcon2}/> : null}
                </View>
            </View>
        </Touchable>
    )
});

export function renderItem(props){
    return <ListItem {...props}/>
}


export function itemSeparatorComponent() {

    return (
        <View style={{backgroundColor: '#fff'}}>
            <View style={styles.listLine}/>
        </View>
    )
}

export {
    ListItem
}