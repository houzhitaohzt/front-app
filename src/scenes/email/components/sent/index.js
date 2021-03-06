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
import sentStore from '../../store/SentStore';
import drawerStore from '../../store/DrawerStore';
import {itemSeparatorComponent, renderItem} from '../list';


/**
 * 已发送
 */
export default observer(props => (
    <View style={mainStyles.container}>
        <SentList store={sentStore} currentMail={drawerStore.currentMail}/>
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