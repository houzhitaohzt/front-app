/**
 * 分页组件尾部
 * @flow
 * @author tangzehua
 * @sine 2017-08-22 10:48
 */
import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import {mainColors} from '../../styles/main.css';

export default observer( props => {
    let { paging, text = "没有更多数据", style } = props;
    if( !paging.tailVisible) return <View style={[styles.container, style]}/>;
    let isLoading = paging.isNextPage || paging.isNextLoading;
    return (
        <View style={[styles.container, style]}>
            {
                isLoading?
                    [
                        <ActivityIndicator key="a1" animating={true} size={'small'} color="#666666"/>,
                        <Text key="t1" style={styles.text}>加载中...</Text>
                    ]
                    : <Text style={styles.text}>{paging.isLimitPage? `数据已达 ${paging.limitSize}条 上限`: text}</Text>
            }
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        fontSize: 12,
        paddingHorizontal: 5,
        textAlign: 'center',
        color: '#999999'
    },
});