/**
 * 产品列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import Touchable from '../../../components/touchable';
import Search from './../../../elements/input/Search';
import {PagingList} from './../../../components/paging';
import productPriceStore from './../store/ProductPriceStore';
import styles from '../styles/ProductPrice.css';
import {mainStyles} from '../../../styles/main.css';
import coreStyles from '../../../styles/core.css';

import {Text, ListTitle} from "../../../components/ui";
import moment from "moment";
import xt from "../../../extension";


export default observer(props => (
    <View style={mainStyles.container}>
        <Search
            placeholder="搜索..."
            placeholderTextColor="#bbbbbb"
            containerStyle={coreStyles.searchContainer}
            inputStyle={coreStyles.searchInput}
            icon={{name: 'search', color: '#bbbbbb'}}
            onSubmitEditing={productPriceStore.onSearch}
            defaultValue={productPriceStore.pagingArgs.key || ""}
        />
        <SentList store={productPriceStore} pagingArgs={productPriceStore.pagingArgs}/>
    </View>
));

const alculateHeight = (data, index) => ({length: 150, offset: 150 * index + 10, index});

const SentList = ({store, pagingArgs}) => (
    <PagingList
        contentContainerStyle={{paddingTop: 10,paddingHorizontal:10}}
        renderItem={renderItem}
        onPress={store.onDetail}
        paging={store.paging}
        getItemLayout={alculateHeight}
        pagingArgs={pagingArgs}
    />
);

const ProductPriceItem = observer(({item, index, onPress}) => (
    <Touchable onPress={onPress} index={index} style={coreStyles.listItem} containerStyle={{borderRadius:8}}>
        <ListTitle data={item} name="mtlLcName" enName="mtlLcName"/>
        <Text c1 fontSize={14} numberOfLines={1} style={styles.propricesingle}>{item.basSpeci}</Text>
        <Text c1 fontSize={14} numberOfLines={1}
              style={styles.propricesingle}>{item.sStatnLcName}</Text>
        <Text c1 fontSize={14} numberOfLines={1} style={styles.propricesingle}>{item.packagLcName}</Text>
        <Text c1 fontSize={14} numberOfLines={1}
              style={styles.propricesingle}>{item.fobMtPrice + item.cnyLcName + "/" + item.uomLcName + "/" + item.contnrTypeLcName}</Text>

        <View c1 fontSize={14} numberOfLines={1} style={styles.propriceBottom}>
            <Text c1 fontSize={14}>{item.purStaffEnName}</Text>
            <Text c1 fontSize={14}>{item.eDate?moment(item.eDate).format('YYYY-MM-DD'):""}</Text>
        </View>
    </Touchable>
));

const renderItem = props => (
    <ProductPriceItem {...props}/>
);