/**
 * 商机列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import PropTypes from "prop-types";
import {observer} from "mobx-react/native";
import Toucable from "../../../components/touchable";
import {PagingList} from "../../../components/paging";
import businessStore from "../store/BusinessStore";
import styles from "../styles/Business.css";
import {mainStyles, mainColors} from "../../../styles/main.css";
import coreStyles from "../../../styles/core.css";
import Search from './../../../elements/input/Search';
import moment from "moment";

export default observer(props => (
    <View style={mainStyles.container}>
        {/*<Search*/}
            {/*placeholder="商机编号/商机主题/客户名称"*/}
            {/*placeholderTextColor="#bbbbbb"*/}
            {/*containerStyle={coreStyles.searchContainer}*/}
            {/*inputStyle={coreStyles.searchInput}*/}
            {/*icon={{name: 'search', color: "#bbbbbb"}}*/}
        {/*/>*/}
        <BusinssList store={businessStore}/>
    </View>
))

const BusinssList = ({store, currentMail}) => (
    <PagingList
        paging={store.paging}
        renderItem={renderItem}
        contentContainerStyle={{paddingTop: 10,paddingHorizontal:10}}
        onPress={store.onDetail}
        getItemLayout={(data, index) => ( {length: 125, offset: 125 * index + 10, index} )}
    />
)

const BusinessItem = observer(({item, index, onPress}) => (
    <Toucable onPress={onPress} data={item} containerStyle={{borderRadius:8}} style={coreStyles.listItem}>
        <View style={styles.listItemV}>
            <Text style={coreStyles.listItemT}>{item.theme || ""}</Text>
        </View>
        <View style={styles.itemRow}>
            <View style={styles.contentSingle}>
                <Text style={styles.text}>{item.no}</Text>
                <Text style={styles.text}>{item.statusName}</Text>
            </View>
            <Text style={styles.text}>预计收入 {item.expInAmt }</Text>
            <Text style={styles.text}>{item.salBeEnName || ""}</Text>
            <View style={styles.contentSingle}>
                <Text style={styles.text}>预计截至日期 {moment(item.billDate).format("YYYY-MM-DD")}</Text>
                <Text style={styles.text}>{item.saleStaffLcName}</Text>
            </View>
        </View>
    </Toucable>
))


const renderItem = props => (
    <BusinessItem {...props} />
)