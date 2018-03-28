/**
 * 销售报价
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import React from "react";
import {View, StyleSheet, Text } from 'react-native';
import PropTypes from "prop-types";
import {observer} from 'mobx-react/native';
import Icon from "react-native-vector-icons/FontAwesome";
import saleOrderStore from "../store/SaleOrderStore";
import Touchable from "../../../components/touchable";
import {PagingList} from "../../../components/paging";
import {mainStyles, mainColors} from "../../../styles/main.css";
import coreStyles from "../../../styles/core.css";
import styles from "../styles/SaleOffer.css";
// import {renderItem} from "../../email/components/list/index";
import moment from "moment";

export default  observer(props => (
    <View style={mainStyles.container}>
        <SaleOfferList store={saleOrderStore} />
    </View>
))

const SaleOfferList = ({store,currentMail}) => (
    <PagingList
        paging={store.paging}
        renderItem={renderItem}
        onPress = {store.onDetail}
        contentContainerStyle={{paddingTop:10,paddingHorizontal:10}}
        getItemLayout={(data,index) => ( {length:90, offset: 90 * index + 10, index} )}
    />
);

const SaleOfferItem = observer(({item,index,onPress}) => (
    <Touchable onPress={onPress} index={index} style={[coreStyles.listItem]} containerStyle={{borderRadius:8}}>
        <View style={styles.listItemV}>
            <Text style={coreStyles.listItemT}>{item.payBusinessLcName || ""}</Text>
        </View>
        <View style={styles.itemRow}>
            <View style={styles.itemsingle}>
                <Text style={styles.text}>订单号: {item.no}</Text>
                <Text style={styles.text}>{item.statusName}</Text>
            </View>
            <Text style={styles.text}>业务日期 {moment(item.billDate).format('YYYY-MM-DD')} </Text>
        </View>
    </Touchable>
));

const renderItem = props => (
    <SaleOfferItem {...props} />
);