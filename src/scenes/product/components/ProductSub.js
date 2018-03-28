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
import productSubStore, {ProductSubStore} from './../store/ProductSubStore';
import styles from '../styles/ProductSub.css';
import {mainStyles} from '../../../styles/main.css';
import coreStyles from '../../../styles/core.css';
//列表的表头
import {ListTitle, Text, SecurityTip} from "../../../components/ui";

@observer
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.productSubStore = new ProductSubStore(props.pageArgs);
    }

    render() {
        let {getArgs} = this.props;
        if( !xt.data.hasMenu('productList')) return <SecurityTip/>;
        return <View style={mainStyles.container}>
            <SentList store={this.productSubStore} pagingArgs={getArgs(this.props)}/>
        </View>
    }
}

const alculateHeight = (data, index) => {
    return ({length: 62, offset: 62 * index + 10, index})
};

const SentList = ({store, pagingArgs}) => (
    <PagingList
        contentContainerStyle={{paddingTop: 10, paddingHorizontal: 10}}
        renderItem={renderItem}
        onPress={store.onDetail}
        paging={store.paging}
        pagingArgs={pagingArgs}
        getItemLayout={alculateHeight}
    />
);

const ProductItem = observer(({item, index, onPress}) => (
    <Touchable onPress={onPress} index={index} style={[coreStyles.listItem, styles.clientPro]}
               containerStyle={{borderRadius: 8}}>
        <View style={styles.clientProTitle}>
            <Text c1 numberOfLines={1}>{item.code}</Text>
            <Text color={"#ff2a2a"} numberOfLines={1}>{item.profit?(item.profit + "%"):0}</Text>
        </View>
        <ListTitle data={item} />
        <Text c1 numberOfLines={1}>{item.specTxt || "sDSFDSF sdfewSDGEQW"}</Text>
    </Touchable>
));

const renderItem = props => (
    <ProductItem {...props}/>
);