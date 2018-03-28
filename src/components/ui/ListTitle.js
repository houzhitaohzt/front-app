import React from "react";
import {StyleSheet, View,} from "react-native";
import {observer} from 'mobx-react/native';
import Text from './Text';
import xt from "../../extension"
import {mainColors} from '../../styles/main.css';

type Props = {
    name: ?string,
    enName: ?string,
    data: Object
}

@observer
export default class extends React.Component{
    props: Props;

    static defaultProps = {
        name: 'localName',  //默认取对象的localname
        enName: "enName",     //默认取对象的enName
        data:{}
    };

    isEqualDom (){
        let {data, name} = this.props;
        return (
            <View style={styles.textSingle}>
                <Text fontSize={16} blue  numberOfLines={1}>{data[name]}</Text>
            </View>
        )
    }

    isNotEqualDom (){
        let {data, name, enName} = this.props;
        return (
            <View style={styles.title}>
                <Text fontSize={16} blue numberOfLines={1}>{data[name]}</Text>
                <Text fontSize={12} blue numberOfLines={1}>{data[enName]}</Text>
            </View>
        )
    }

    render(){
        let {data, name, enName} = this.props;
        return (xt.isBlank(data[enName]) || data[name] === data[enName] ) ? this.isEqualDom() : this.isNotEqualDom()
    }
}

const styles = StyleSheet.create({
    title:{
        // backgroundColor:"#fff",
        // backgroundColor: mainColors.rowBack,
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        // paddingHorizontal:6,
        paddingTop:6,
        paddingBottom:3,
        // marginBottom:2
    },
    textSingle:{
        // backgroundColor:"#fff",
        // backgroundColor: mainColors.rowBack,
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        // paddingHorizontal:6,
        paddingTop:6,
        paddingBottom:6
    }
});