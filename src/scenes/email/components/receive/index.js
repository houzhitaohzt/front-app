/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 17:12
 */
import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer} from 'mobx-react/native';
import {SelectTip} from '../../../../components/select/index';
import receiveStore from '../../store/ReceiveStore';
import drawerStore from '../../store/DrawerStore';
import ReceiveList from './List';
import styles from '../../styles/receive.css';
import {mainStyles} from '../../../../styles/main.css';


export function NavTitle (props){
    return (
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={receiveStore.onTitleMenu} activeOpacity={0.7}>
            <View style={styles.titleView}>
                <Text style={styles.title}>收件箱</Text>
                <Icon name={receiveStore.selectTipVisible? "angle-up" : "angle-down"} color="#fff" size={16}/>
            </View>
            <Text style={styles.cMail}>{drawerStore.currentMail}</Text>
        </TouchableOpacity>
    )
}

export function NavRight (state){
    return (
        <TouchableOpacity style={mainStyles.topNavRight} onPress={receiveStore.onWrite}>
            <Image source={require('../../../../assets/icons/mail-editor.png')}/>
        </TouchableOpacity>
    )
}

export default observer((props) => {
    return (
        <View style={styles.container}>
            <ReceiveList store={receiveStore} currentMail={drawerStore.currentMail}/>
            <TipMenu store={receiveStore} currentMail={drawerStore.currentMail}/>
        </View>
    )
})

const TipMenu = observer(({store, currentMail}) => (
    <SelectTip
        visible={store.selectTipVisible}
        onHide={store.onHideSelectTip}
        data={store.tipMenu}
        value={store.tipMenuValue}
        onPress={store.onTipMenu}
    />
));