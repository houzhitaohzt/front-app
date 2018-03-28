/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 17:30
 */
import React from 'react';
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import SvgIcon from '../../../../components/icons/SvgIcon';
import Touchable from '../../../../components/touchable';
import Icon from 'react-native-vector-icons/FontAwesome'
import ListItem from '../../../../elements/list/ListItem';
import {mainColors} from '../../../../styles/main.css';
import drawerStore from '../../store/DrawerStore';
import * as Animatable from 'react-native-animatable';

import styles from '../../styles/drawer.css';

@observer
export class Drawer extends React.Component {
    static propTypes = {
        store: PropTypes.object
    };

    itemSeparatorComponent = ({highlighted, leadingItem: item}) => (
        <View style={{backgroundColor: '#fff'}}>
            <View style={[styles.itemFeedback, item.bottom ? styles.itemBottom : {}]}/>
        </View>
    );

    renderItem = ({item, index}) => {
        let badge = item.badge > 99? "99+": (item.badge > 0? String(item.badge): null);
        let {store} = this.props;
        return (
            <ListItem
                underlayColor={mainColors.touchBack}
                onPress={store[item.key]}
                containerStyle={styles.listItemContainer}
                wrapperStyle={styles.listItemWrapper}
                titleStyle={styles.titleStyle}
                title={item.title}
                leftIcon={<View style={styles.svgIcon}><Image source={item.image} style={{tintColor: item.tintColor || mainColors.primary1}}/></View>}
                badge={{value: badge, containerStyle: styles.badgeContainer, textStyle: styles.badgeText}}
            />
        )
    };

    renderMail = () => {
        let {store} = this.props;
        return (
            <Touchable onPress={store.onMailListVisible} style={styles.titleView}>
                <Text style={styles.titleText}>{store.currentMail}</Text>
                <Icon name={store.mailListVisible? "angle-up": "angle-down"} color="#000" size={20}/>
            </Touchable>
        )
    };

    renderMailListItem = (item, index)=>{
        let {store} = this.props;
        return (
            <Touchable key={item.mail} onPress={store.switchMail} index={index} style={styles.titleView}>
                <Text style={styles.titleText}>{item.mail}</Text>
                {item.badge? <Icon name="circle" color="red" size={10}/>: null}
            </Touchable>
        )
    };

    renderMailList = ()=>{
        let {store} = this.props;
        return (
            <TouchableOpacity style={styles.mailList} onPress={store.onMailListVisible} activeOpacity={1}>
                <View style={styles.mask}/>
                <Animatable.View animation="slideInDown" useNativeDriver duration={100}>
                    <ScrollView alwaysBounceVertical={false}>{store.currentMailList.map(this.renderMailListItem)}</ScrollView>
                </Animatable.View>
            </TouchableOpacity>
        );
    };

    render() {
        const {store} = this.props;
        return (
            <View style={styles.container}>
                {this.renderMail()}
                <FlatList
                    data={store.menuList}
                    initialNumToRender={0}
                    renderItem={this.renderItem}
                    getItemLayout={(data, index) => ( {length: 40, offset: 40 * index + (data.bottom? 10: 0), index} )}
                    ItemSeparatorComponent={this.itemSeparatorComponent}
                    keyExtractor={(item) => item.title}
                />
                {store.mailListVisible? this.renderMailList(): null}
            </View>
        );
    }
}

export default () => <Drawer store={drawerStore}/>
