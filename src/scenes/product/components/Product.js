/**
 * 产品列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import Touchable from '../../../components/touchable';
import Search from './../../../elements/input/Search';
import {PagingList} from './../../../components/paging';
import productStore from './../store/ProductStore';
import styles from '../styles/Product.css';
import {mainStyles} from '../../../styles/main.css';
import coreStyles from '../../../styles/core.css';
//列表的表头
import {ListTitle} from "../../../components/ui";
import xt from "../../../extension";

export default observer(props => (
    <View style={mainStyles.container}>
        <Search
            placeholder="产品名称,等级,编码查询"
            placeholderTextColor="#bbbbbb"
            containerStyle={coreStyles.searchContainer}
            inputStyle={coreStyles.searchInput}
            icon={{name: 'search', color: '#bbbbbb'}}
            onSubmitEditing={productStore.onSearch}
            defaultValue={productStore.pagingArgs.name || ""}
        />
        <SentList store={productStore} pagingArgs={productStore.pagingArgs} />
    </View>
));

const alculateHeight = (data, index) => {
    return xt.isEmpty(data.enName) || data.localName === data.enName ? ({length: 104, offset: 104 * index + 10, index}) : ({
        length: 114,
        offset: 114 * index + 10,
        index
    })
};

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

const ProductItem = observer(({item, index, onPress}) => (
    <Touchable onPress={onPress} index={index} style={coreStyles.listItem} containerStyle={{borderRadius:8}}>
        <ListTitle data={item}/>
        <Text style={styles.twosay} numberOfLines={2}>{item.specTxt}</Text>
        <View style={styles.threemore} numberOfLines={1}>
            <Text style={styles.threemoreone}>{item.dataDiv ? item.dataDiv + "    /    " : ""}</Text>
            <Text
                style={styles.threemoreone}>{item.staffs && item.staffs[0] ? item.staffs[0] + "    /    " : ""}</Text>
            <Text style={styles.threemoreone}>{item.code}</Text>
        </View>
    </Touchable>
));

const renderItem = props => (
    <ProductItem {...props}/>
);