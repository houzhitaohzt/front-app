/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 17:12
 */
import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react/native';
import {PagingList} from './../../../../components/paging';

import {mainStyles} from '../../../../styles/main.css';
import dustbinStore from '../../store/DustbinStore';
import drawerStore from '../../store/DrawerStore';
import {itemSeparatorComponent, renderItem} from '../list';


/**
 * 垃圾箱
 */
export default observer(props => (
    <View style={mainStyles.container}>
        <SentList store={dustbinStore} currentMail={drawerStore.currentMail}/>
    </View>
))

const SentList = ({store, currentMail}) => (
    <PagingList
        ItemSeparatorComponent={itemSeparatorComponent}
        renderItem={renderItem}
        onPress={store.onDetail}
        paging={store.paging}
        pagingArgs={{userAddress: currentMail}}
        getItemLayout={(data, index) => ( {length: 80, offset: 81 * index + 10, index} )}
    />
);