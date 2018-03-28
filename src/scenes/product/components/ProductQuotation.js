/**
 * 产品报价
 * @flow
 * @author houzhitao
 * @sine 2017-08-29 10:32
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import Touchable from '../../../components/touchable';
import Search from './../../../elements/input/Search';
import {PagingList} from './../../../components/paging';
import productQuotationStore from './../store/ProductQuotationStore';
import styles from '../styles/ProductQuotation.css';
import {mainStyles} from '../../../styles/main.css';
import coreStyles from '../../../styles/core.css';

import {Text, ListTitle} from "../../../components/ui";
import moment from "moment";


export default observer(props => (
    <View style={mainStyles.container}>
        {/*<Search*/}
            {/*placeholder="搜索..."*/}
            {/*placeholderTextColor="#bbbbbb"*/}
            {/*containerStyle={coreStyles.searchContainer}*/}
            {/*inputStyle={coreStyles.searchInput}*/}
            {/*icon={{name: 'search', color: '#bbbbbb'}}*/}
        {/*/>*/}
        <SentList store={productQuotationStore}/>
    </View>
));

const alculateHeight = (data, index) => {
    return ({length: 80, offset: 80 * index + 80, index});
};

const SentList = ({store}) => (
    <PagingList
        contentContainerStyle={{paddingTop: 10,paddingHorizontal:10}}
        renderItem={renderItem}
        onPress={store.onProQuoDel}
        paging={store.paging}
        getItemLayout={alculateHeight}
    />
);

const ProductPriceItem = observer(({item, index, onPress}) => (
    <View style={[coreStyles.listItem, styles.proQuoContainer]}>
        <View c1 fontSize={14} numberOfLines={1} style={styles.proQuoBottom}>
            <Text c1 fontSize={14} style={styles.proQuosingle}>{item.code || "PD002568"}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text c1 fontSize={14} style={styles.proQuosingle}>{"X"}</Text>
            </TouchableOpacity>
        </View>
        <Text c1 fontSize={14} numberOfLines={1}
              style={styles.proQuosingle}>{item.localName || "黄原胶"}</Text>
        <Text c1 fontSize={14} numberOfLines={1} style={styles.proQuosingle}>{item.basSpeci}</Text>

        </View>
));

const renderItem = props => (
    <ProductPriceItem {...props}/>
);