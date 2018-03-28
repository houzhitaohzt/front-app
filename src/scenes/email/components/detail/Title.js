/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-22 17:58
 */
import React from 'react';
import { View} from 'react-native';
import {Text} from '../../../../components/ui';
import {observer} from 'mobx-react/native';
import styles from '../../styles/detail.css';
import moment from 'moment';


export default observer(props => {
    let {store, item} = props;
    let {
        id, sendMail, sendName, subject, followMark, containAttach
    } = item;
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleMain}>{subject}</Text>
            {
                store.titleDetail?
                    <DetailTitle store={store} item={item}/> :
                    <View style={styles.detailSlot}>
                        {
                            store.mailItem.box === 'SEND'?
                                <Text style={styles.titleSub}>我 发至 {sendName || sendMail}</Text>:
                                <Text style={styles.titleSub}>{sendName || sendMail} 发至 我</Text>
                        }

                        <Text style={styles.titleBtn} onPress={store.onTitleDetail}>详情</Text>
                    </View>
            }
        </View>
    )
});

const DetailTitle = ({store, item}) => (
    <View>
        <View style={styles.titleDetail}>
            <Text style={styles.titleSub2}>发件人</Text>
            <Text style={styles.titleSub3}>{item.sendName || item.sendMail}</Text>
        </View>
        <View style={styles.titleDetail}>
            <Text style={styles.titleSub2}>收件人</Text>
            <Text style={styles.titleSub3}><Text>{item.toAddress}</Text></Text>
        </View>
        <View style={styles.titleDetail}>
            <Text style={styles.titleSub2}>时间</Text>
            <View style={styles.detailSlot2}>
                <Text style={styles.titleTime}>{moment(item.sendTime).format('YYYY-MM-DD HH:MM dddd')}</Text>
                <Text style={styles.titleBtn} onPress={store.onTitleDetail}>隐藏</Text>
            </View>
        </View>
    </View>
);