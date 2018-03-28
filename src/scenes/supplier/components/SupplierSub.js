/**
 * 供应商附属列表
 * @flow
 * @author houzhitoa
 * @sine 2017-08-29 10:32
 */
import React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import PropTypes from "prop-types";
import {observer} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Touchable from "../../../components/touchable";
import {PagingList} from "../../../components/paging";
import supplierSubStore , {SupplierSubStore} from "../store/SupplierSubStore";
import styles from "../styles/SupplierSub.css";
import {mainStyles, mainColors} from "../../../styles/main.css";
import coreStyles from '../../../styles/core.css';
//列表的表头
import {ListTitle, SecurityTip} from "../../../components/ui";
import xt from "../../../extension";

export default class extends React.Component{
    constructor(props){
        super(props);
        this.supplierSubStore = new SupplierSubStore();
    }
    render(){
        let {getArgs} = this.props;
        if( !xt.data.hasMenu('supplier')) return <SecurityTip/>;
        return(
            <View style={mainStyles.container}>
                <SupplierSubList store={this.supplierSubStore} pagingArgs={getArgs(this.props)}/>
            </View>
        )
    }
}

const alculateHeight = (data, index) => {
    return xt.isEmpty(data.enName) || data.localName === data.enName ? ({
        length: 65,
        offset: 65 * index + 10,
        index
    }) : ({length: 80, offset: 80 * index + 10, index})
}
const SupplierSubList = ({store, pagingArgs}) => (
    <PagingList
        paging={store.paging}
        pagingArgs={pagingArgs}
        contentContainerStyle={{paddingTop: 10,paddingHorizontal:10}}
        renderItem={renderItem}
        onPress={store.onDetail}
        getItemLayout={alculateHeight}
    />
);

const SupplierSubItem = observer(({item, index, onPress}) => (
    <Touchable onPress={onPress} index={index} style={coreStyles.listItem} containerStyle={{borderRadius:8}}>
        <ListTitle data={item}/>
        <View style={styles.itemRow}>
            <View style={styles.row}>
                <View style={[styles.contentsingle, styles.left]}>
                    <Icon name='flag' size={12} color={mainColors.primary1}/>
                    <Text style={styles.text} numberOfLines={1}>{item.country || ""}</Text>
                </View>
                <View style={[styles.contentsingle, {flex: 1}]}>
                    <Icon name='user' size={14} color={mainColors.primary1}/>
                    <Text style={styles.text}
                          numberOfLines={1}>{item.defaultContact && item.defaultContact.localName ? item.defaultContact.localName : ""}</Text>
                </View>
            </View>
        </View>
    </Touchable>
))

const renderItem = props => (
    <SupplierSubItem {...props} />
)



