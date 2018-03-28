/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-24 13:50
 */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react/native';
import SvgIcon from '../../../../components/icons/SvgIcon';
import styles from '../../styles/detail.css';


const IconButton = props => (
    <TouchableOpacity style={styles.bottomItem} onPress={props.onPress}>
        <SvgIcon name={props.svg} size={20}/>
        <Text style={styles.bottomItemText}>{props.title}</Text>
    </TouchableOpacity>
);

export default observer(({store}) => (
    store.detailData && store.detailData.context ?
        <View style={styles.bottomContainer}>
            {
                store.mailItem.box==='RECEIVE' && !store.mailItem.isDelete
                    ? <IconButton svg='reply_forward' title='回复/转发' onPress={store.onReplyOrForward}/>: null
            }
            {/*<IconButton svg='delete' title='删除' onPress={store.onDelete}/>*/}
            {/*<IconButton svg='more' title='更多' onPress={store.onMore}/>*/}
        </View> : null
))