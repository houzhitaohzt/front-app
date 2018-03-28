/**
 *
 * @flow
 * @author houzhitao
 * @sine 2017-09-01 11:23
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import {Text} from '../ui';
import xt from '../../extension';
import {mainColors} from '../../styles/main.css';

/*
* author:houzhitao
* use: 主要用于app 详情的table
* */
export function specTxtMode(item, index, data, props) {
    let { column } = props;
    return (
        <View style={styles.specTxtSingle} key={index}>
            {
                column.map((e,i) => {
                    let obj = item[e.key] || "";
                    let vl = "";
                    if(xt.isObject(obj)&& (obj.localName || obj.name)){
                        vl = obj.localName || obj.name;
                    }else if(xt.isArray(obj)){
                        vl = obj.map(e => xt.isObject(e) ? e.localName : e ).join("\n");
                    }else{
                        vl = item[e.key];
                    }
                    return (<Text style={[styles.spectd,e.tdStyle]} key={item.id + i}>{vl}</Text>)
                })
            }
        </View>
    )
}




const styles = StyleSheet.create({
    specTxtSingle:{
        flex:1,
        flexDirection:"row",
        backgroundColor:"#fff",
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    spectd:{
       color: mainColors.sub1Text,
    }
});
