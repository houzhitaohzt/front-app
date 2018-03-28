/* @flow */

import React from 'react';
import {FlatList, RefreshControl, SectionList, StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react/native';
import SvgIcon from '../icons/SvgIcon';
import {mainColors} from './../../styles/main.css';

const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
};

/**
 * 公共列表
 */
@observer
export default class extends React.Component {

    constructor (props) {
        super(props);
        let that = this;
        that.defProps = {
            viewabilityConfig: VIEWABILITY_CONFIG,
            keyboardShouldPersistTaps: "handled",
            keyboardDismissMode: "on-drag",
            initialNumToRender: 6,
            keyExtractor: item => item.id,
            ListEmptyComponent: that.listEmpty,
            onEndReachedThreshold: 0.1,
            alwaysBounceVertical: false,
            iosbounces: false,
            ItemSeparatorComponent: that.itemSeparatorComponent
        };
    }

    renderItem = ({item, index}) => this.props.renderItem({item, index, onPress: this.props.onPress});

    //空元素
    listEmpty = () => {
        let {refreshing, data, sections} = this.props;
        let dataList = data || sections;
        if( refreshing || !dataList || dataList.length > 0) return null;
        return (
            <View style={styles.emptyContainer}>
                <SvgIcon name='no-data' size={100}/>
                <Text style={styles.emptyText}>暂无数据</Text>
            </View>
        )
    };

    itemSeparatorComponent = () => (
        <View style={{backgroundColor: 'transparent'}}>
            <View style={styles.listLine}/>
        </View>
    );

    componentDidUpdate() {
        // console.log("< RefreshList: 连续出现3次, 请注意无变化的渲染优化 >");
    }

    render() {
        let that = this;
        let { sections } = that.props;
        let {
            refreshing, onRefresh, progressViewOffset, renderItem, ...rest
        } = that.props;

        let coverProps = {
            renderItem: that.renderItem,
            legacyImplementation: false,
            refreshControl:
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    progressViewOffset={progressViewOffset}
                    tintColor="#579acc"
                    title={refreshing? '加载中...': '下拉刷新'}
                    titleColor="#579acc"
                    colors={['#579acc']}
                />
        };
        let props = Object.assign({}, that.defProps, rest, coverProps);
        return sections ? <SectionList {...props}/> : <FlatList {...props}/>;
    }
}

const styles = StyleSheet.create({

    emptyContainer: {
        flex: 1,
        marginTop: 150,
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 14,
        color: mainColors.sub2Text
    },

    listLine: {
        height: 8,
        backgroundColor: 'transparent'
    }
});