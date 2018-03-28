/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-01 11:23
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import {Text} from '../ui';
import xt from '../../extension';

import styles from './GridTile.css';

type Props = {
    rowSpace ?: number, // row 行高, padding 值
    textRight ?: Object, // 右边文字样式
    textLeft ?: Object, // 左边文字样式
    subStyle ?: Object, // 子标题颜色, 影响所有 row
    titleStyle ?: Object, // 标题样式, 影响所有 row
    column ?: Array, //和table 的用法一样 要是写table 就会用到columns
    viewHeader ?: (boolean | number), //专门用来调试详情的样式, 主要是给没有单个模块top一个高度
    viewBottom ?: (boolean | number), //专门用来调试详情的样式, 主要是给没有单个模块bottom一个高度
}

export default observer(props => {
    let {
        title, content, rows, data, header,viewHeader, viewBottom,
        renderItem = NormalItem,
        renderHeader = NormalHeader, ...rest
    } = props;
    return (
        <View style={styles.container}>
            {title ? <Text fontSize={15} style={styles.title}>{title}</Text> : <View style={styles.noTitle}/>}
            {
                title &&
                <View style={styles.line}>
                    <View style={styles.line3}/>
                </View>
            }
            {
                header &&
                <View style={{flexDirection: 'row', flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
                    {header.map((da, index) => renderHeader(da, index, rest))}
                </View>
            }
            { viewHeader && <View style={{backgroundColor:'#fff',height:6}}/>}
            {rows && (rows.length ? rows.map((da, index) => renderItem(da, index, data, rest)): <View style={styles.rowNull}/>)}
            { viewBottom && <View style={{backgroundColor:'#fff',height:6}}/>}
            {content && content(data)}
        </View>
    )
});


type NormalData = {
    valueText ?: Object, // value 样式
    labelText ?: Object, // label 样式
    key ?: string, // 取值 key
    label ?: string, // 显示名称
    line ?: (boolean | number), // 是否下方有分割线
    space ?: (boolean | number), // 下方间隙, 默认10
    getValue ?: ((data: Object, key: string) => {})
}

/**
 * 普通的表格, 2列
 * @param item
 * @param index
 * @param data
 * @param props
 * @constructor
 */
const NormalItem = (item, index, data, props) => {
    let {titleStyle, subStyle, textLeft, textRight, rowSpace} = props;
    let {valueText, key, label, labelText, line, space, getValue} = item;
    labelText = Object.assign({}, textLeft, labelText);
    valueText = Object.assign({}, textRight, valueText);
    let vl = "";
    if(getValue){
        vl = getValue(item,data);
    }else{
        if(xt.isObject(data[key]) && data[key] && data[key].length){
            vl =  data[key].map( e => {
                return xt.isObject(e) ? (e.localName || e.name) : e
            }).join("\n");
        }else if(xt.isObject(xt.getItemValue(data,key))){
            vl = xt.getItemValue(data,key).localName || xt.getItemValue(data,key).name;
        }else if(typeof xt.getItemValue(data,key) === "boolean"){
            vl = xt.getItemValue(data,key)?"是":"否";
        }else{
            vl = xt.getItemValue(data,key);
        }
    }

    return [
        <View style={[styles.row, !isNaN(rowSpace) && {paddingVertical: rowSpace}]} key={index}>
            {item.label && <Text c1 {...labelText} style={[styles.col1, titleStyle]}>{label}</Text>}
            <Text selectable {...valueText} style={[styles.col2, subStyle]}>
                {( vl || "")}
            </Text>
        </View>,
        line &&
        <View style={[styles.line2, line !== true && {height: line}]}>
            <View style={styles.line3}/>
        </View>,
        space && <View style={[styles.space, space !== true && {height: space, marginTop: space}]}/>
    ]
};

const NormalHeader = (item, index, props) => {
    let {titleStyle, subStyle, textLeft, textRight, rowSpace, column} = props;
    let {valueText, label, labelText, line, space, key} = item;
    labelText = Object.assign({}, textLeft, labelText);
    valueText = Object.assign({}, textRight, valueText);
    let columnSingleList = column.filter(da => da.key === item.key);
    let columnSingle = columnSingleList && columnSingleList[0] ? columnSingleList[0] : {};
    return [
        <Text c1 {...labelText} style={columnSingle["thStyle"]}>{label || ""}</Text>
    ]
};


/*
* <View style={[styles.row,titleStyle[key]]} key={index}>
            {item.label && <Text c1 {...labelText} style={[styles.coltitle, titleStyle[key]]}>{label}</Text>}
        </View>*/
