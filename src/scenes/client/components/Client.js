/**
 * 客户列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import PropTypes from "prop-types";
import {observer} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Touchable from "../../../components/touchable";
import {PagingList} from "../../../components/paging";
import clientStore from "../store/ClientStore";
import styles from "../styles/Client.css";
import {mainStyles, mainColors} from "../../../styles/main.css";
import coreStyles from '../../../styles/core.css';
import Search from './../../../elements/input/Search';
//列表的表头
import {ListTitle} from "../../../components/ui";
import xt from "../../../extension";

export default observer(props => (
    <View style={mainStyles.container}>
        <Search
            placeholder="请输入名称"
            placeholderTextColor="#bbbbbb"
            containerStyle={coreStyles.searchContainer}
            inputStyle={coreStyles.searchInput}
            icon={{name: 'search', color: '#bbbbbb'}}
            onSubmitEditing={clientStore.onSearch}
            defaultValue={clientStore.pagingArgs.name || ""}
        />
        <ClientList store={clientStore} pagingArgs={clientStore.pagingArgs}/>
    </View>
))
const alculateHeight = (data, index) => {
    return xt.isEmpty(data.enName) || data.localName === data.enName ? ({
        length: 88,
        offset: 88 * index + 10,
        index
    }) : ({length: 103, offset: 103 * index + 10, index})
};
const ClientList = ({store, pagingArgs}) => (
    <PagingList
        paging={store.paging}
        contentContainerStyle={{paddingTop: 10,paddingHorizontal:10}}
        renderItem={renderItem}
        onPress={store.onDetail}
        getItemLayout={alculateHeight}
        pagingArgs={pagingArgs}
    />
);

const ClientItem = observer(({item, index, onPress}) => (
    <Touchable onPress={onPress} index={index} style={coreStyles.listItem} containerStyle={{borderRadius:8}} >
        <ListTitle data={item}/>
        <View style={styles.row}>
            <View style={[styles.contentsingle, styles.left]}>
                <Icon name='flag' size={12} color={mainColors.primary1}/>
                <Text style={styles.text} numberOfLines={1}>{item.country || ""}</Text>
            </View>
            <View style={[styles.contentsingle, {flex: 1}]}>
                <Icon name='grav' size={12} color={mainColors.primary1}/>
                <Text style={styles.text}>{item.level || ""}</Text>
            </View>
        </View>
        <View style={[styles.row, styles.rightText]}>
            <View style={[styles.contentsingle, styles.left]}>
                <Icon name='user-o' size={14} color={mainColors.primary1}/>
                <Text style={styles.text}
                      numberOfLines={1}>{item.defaultContact && item.defaultContact.localName ? item.defaultContact.localName : ""}</Text>
            </View>
            <View style={[styles.contentsingle, {flex: 1}]}>
                <Icon name='envelope-o' size={12} color={mainColors.primary1}/>
                <Text style={styles.text}
                      numberOfLines={1}>{item.defaultContact && item.defaultContact.defaultEmail ? item.defaultContact.defaultEmail : ""}</Text>
            </View>
        </View>
    </Touchable>
))

const renderItem = props => (
    <ClientItem {...props} />
)



