/**
 * 首页-中心的菜单
 * @flow
 * @author tangzehua
 * @sine 2017-08-03 15:45
 */
import React from 'react';
import {View, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import {observer} from 'mobx-react/native';
import SvgIcon from '../../../components/icons/SvgIcon';
import {mainColors} from './../../../styles/main.css';
import {Text} from '../../../components/ui'

const {width: screenWidth} = Dimensions.get('window');

@observer
export default class extends React.Component {

    renderMenu = (item, index, section) =>{
        let ix = index + 1;
        let borderBottom = ix > (Math.floor(section.length / 4) * 4)? 0: StyleSheet.hairlineWidth;
        let borderRight = ix % 4 === 0? 0: StyleSheet.hairlineWidth;
        return (
            <MenuItem
                key={item.title}
                store={this.props.store}
                item={item}
                borderBottom={borderBottom}
                borderRight={borderRight}
            />
        )
    };

    render (){
        let {store} = this.props;
        return (
            <View style={styles.container}>
                { store.menuArray.map(this.renderMenu) }
            </View>
        );
    }
}

@observer
class MenuItem extends React.Component {

    onItemPress = ()=>{
        this.props.store.onCMenuPress(this.props.item)
    };

    render (){
        let {store, borderBottom, item, borderRight} = this.props;
        let {title, icon} = item;
        return (
            <TouchableHighlight
                delayPressIn={0}
                delayPressOut={0}
                underlayColor={mainColors.touchBack}
                onPress={this.onItemPress}
            >
                <View key={icon} style={[styles.menu, {borderBottomWidth: borderBottom, borderRightWidth: borderRight}]}>
                    <View style={styles.svgIcon}><SvgIcon name={icon}/></View>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginTop: 10,
        flexWrap: 'wrap'
    },

    menu: {
        width: screenWidth/ 4,
        height: screenWidth/ 4.5,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 20,
        // paddingVertical: 15,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: mainColors.mainLine
    },

    svgIcon: {
        paddingBottom: 5,
    },

    titleText: {
        color: mainColors.mainText,
        fontSize: 12,
    }
});