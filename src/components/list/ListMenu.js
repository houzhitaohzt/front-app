/* @flow */

import React from 'react';
import {StyleSheet, View, SectionList, FlatList, Text, TouchableNativeFeedback, Image} from 'react-native';
import {observer} from 'mobx-react/native';
import List from './../../elements/list/List';
import ListItem from './../../elements/list/ListItem';
import xt from '../../extension';
import {mainColors} from './../../styles/main.css';

/**
 * 公共列表
 */
@observer
export default class extends React.Component {

    renderSectionHeader = ({section}) => (
        <View style={styles.listSection} >
            <Text style={styles.listSectionText}>{section.title}</Text>
        </View>
    );

    onItemPress = (item) => {
        this.props.onPress && this.props.onPress(item);
    };

    getLeftIcon = (item, index)=> (
        <View style={styles.icon}>
            <Image source={item.image}/>
        </View>
    );

    renderItem = ({item, index}) => {
        let leftIcon =  item.image && this.getLeftIcon(item, index) || {name: item.icon, color: mainColors.iconBack, size: 18};
        return (
            <ListItem
                underlayColor={mainColors.touchBack}
                onPress={()=>this.onItemPress(item)}
                subtitleStyle={styles.subtitle} roundAvatar
                containerStyle={styles.listItemContainer}
                rightTitleContainerStyle={styles.rightTitleContainer}
                rightTitleStyle={styles.rightTitle}
                wrapperStyle={styles.listItemWrapper}
                title={item.title} avatar={item.avatar}
                subtitle={item.subtitle} rightTitle={item.rightTitle}
                hideChevron={!!item.avatar} chevronColor="#C7C7CC"
                leftIcon={leftIcon}
                badge={{value: item.badge, containerStyle: styles.badgeContainer, textStyle: styles.badgeText}}
            />
        )
    };

    itemSeparatorComponent = ({highlighted, leadingItem: item}) => (
        <View style={{backgroundColor: '#fff'}}>
            <View style={[ styles.itemFeedback, item.bottom? styles.itemBottom: {} ]} />
        </View>
    );

    listFooterComponent = () => (
        this.props.bottomLine? <View style={styles.bottomLine} />: null
    );

    renderSection = (sections)=>(
        <SectionList
            alwaysBounceVertical={false}
            initialNumToRender={0}
            getItemLayout={(data, index) => ( {length: 35, offset: 35 * index + (data.bottom? 10: 0), index} )}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            ItemSeparatorComponent={this.itemSeparatorComponent}
            ListFooterComponent={this.listFooterComponent}
            keyExtractor={(item) => item.title}
            {...this.props}
        />
    );

    renderFlat = (data)=>(
        <FlatList
            alwaysBounceVertical={false}
            initialNumToRender={0}
            getItemLayout={(data, index) => ( {length: 35, offset: 36 * index+ (data.bottom? 10: 0), index} )}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.itemSeparatorComponent}
            ListFooterComponent={this.listFooterComponent}
            keyExtractor={(item) => item.title}
            {...this.props}
        />
    );

    render (){
        let {sections, data} = this.props;
        if(!sections && !data) return <View/>;
        return sections? this.renderSection(): this.renderFlat();
    }
}

const styles = StyleSheet.create({

    itemFeedback: {
        backgroundColor: mainColors.mainLine,
        height: StyleSheet.hairlineWidth + 0.06,
        marginLeft: 12,

    },
    bottomLine: {
        borderColor: mainColors.mainLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        height: 1,
    },

    itemBottom: {
        borderColor: '#EFEFF3',
        borderBottomWidth: 10,
        marginLeft: 0,
    },

    listSection: {
        backgroundColor: '#EFEFF4',
        height: 35,
        justifyContent:'center',
    },

    listSectionText: {
        color: '#3E3E3A',
        paddingLeft: 18,
    },

    listContainer: {
        flex: 1,
        borderTopWidth: 0,
        backgroundColor: '#F5FCFF',
    },

    listItemContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        paddingLeft: 12,
        paddingTop: 8,
        paddingRight: 12,
        paddingBottom: 8,
    },

    listItemWrapper: {
        marginLeft: -3,
    },

    subtitle: {
        color: '#686868',
        fontSize: 12,
        fontWeight: '100',
    },

    rightTitleContainer: {
        justifyContent: 'flex-start',
        width: 70,
        flex: 0,
    },

    rightTitle: {
        marginRight: 0,
        fontSize: 12,
    },

    badgeContainer: {
        backgroundColor: 'red',
        padding: 5,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 7,
    },

    badgeText: {
        fontSize: 12,
    },

    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
    }
});