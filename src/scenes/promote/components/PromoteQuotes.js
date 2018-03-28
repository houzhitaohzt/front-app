/**
 *
 * @flow
 * @author houzhitao
 * @sine 2017-09-25 09:55
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import promoteQuotesStore from './../store/PromoteQuotesStore';
import {mainStyles} from "../../../styles/main.css";
import coreStyles from '../../../styles/core.css';
import Search from './../../../elements/input/Search';
import {PagingList} from "../../../components/paging";
import styles from "../styles/PromoteQuotes.css";
import {Text, ListTitle} from "../../../components/ui";
import moment from "moment";

export default observer(props => (
    <View style={coreStyles.container}>
        <Search
            placeholder="搜索..."
            placeholderTextColor="#bbbbbb"
            containerStyle={coreStyles.searchContainer}
            inputStyle={coreStyles.searchInput}
            onSubmitEditing={promoteQuotesStore.onSearch}
            defaultValue={promoteQuotesStore.pagingArgs.key || ""}
        />
        <SentList store={promoteQuotesStore} />
    </View>
))

const alculateHeight = (data, index) => ({length: 150, offset: 150 * index + 10, index});

const SentList = ({store}) => (
    <PagingList
        paging={store.paging}
        contentContainerStyle={{paddingTop:10,paddingHorizontal:10}}
        renderItem ={renderItem}
        getItemLayout={alculateHeight}
    />
);

const PromoteQuotes = observer(({item,index,onPress}) => (
    <View index={index} style={[coreStyles.listItem,styles.single]}>
        <View style={styles.title}>
            <Text c1 fontSize={14} numberOfLines={1} style={styles.textpad}>{item.mtlCode}</Text>
            <Text c1 fontSize={14} numberOfLines={1} style={styles.textpad}>{moment(item.eDate).format('YYYY-MM-DD')}</Text>
        </View>
        <Text c1 blue fontSize={17} numberOfLines={1} style={styles.textpad}>{item.mtlName}</Text>
        <Text c1 fontSize={14} numberOfLines={1} style={styles.textpad}>{item.basSpeci}</Text>
        <Text c1 fontSize={14} numberOfLines={1} style={styles.textpad}>{item.eStatnName + " ---- " + item.sStatnName}</Text>
        <Text c1 fontSize={14} numberOfLines={1} style={styles.textpad}>{item.fobPrc + " " + item.cnyName } {item.cifPrc? "/" + item.cifPrc + item.cnyName:""}</Text>
        <Text c1 fontSize={14} numberOfLines={1} style={styles.textpad}>{item.ccName}</Text>
    </View>
));

const renderItem = props => (
  <PromoteQuotes {...props} />
);