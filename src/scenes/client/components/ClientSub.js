/**
 * 客户列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import PropTypes from "prop-types";
import {observer} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Touchable from "../../../components/touchable";
import {PagingList} from "../../../components/paging";
import {ClientSubStore} from "../store/ClientSubStore";
import styles from "../styles/ClientSub.css";
import {mainStyles, mainColors} from "../../../styles/main.css";
import coreStyles from '../../../styles/core.css';
//列表的表头
import {ListTitle, SecurityTip} from "../../../components/ui";
import xt from "../../../extension";

@observer
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.store = new ClientSubStore();
        this.store.b = 2;
    }

    render() {
        let {getArgs} = this.props;
        if( !xt.data.hasMenu('clientList')) return <SecurityTip/>;
        return (
            <View style={mainStyles.container}>
                <ClientList store={this.store} pagingArgs={getArgs(this.props)}/>
            </View>)
    }
}
// export default observer(props => (
//     <View style={mainStyles.container}>
//         <ClientList store={clientSubStore} pagingArgs={props.getArgs(props)}/>
//     </View>
// ))
const alculateHeight = (data, index) => {
    return xt.isEmpty(data.enName) || data.localName === data.enName ? ({
        length: 85,
        offset: 85 * index + 10,
        index
    }) : ({length: 100, offset: 100 * index + 10, index})
};

const ClientList = ({store, pagingArgs}) => (
    <PagingList
        c={store.b}
        paging={store.paging}
        pagingArgs={pagingArgs}
        contentContainerStyle={{paddingTop: 10, paddingHorizontal: 10}}
        renderItem={renderItem}
        onPress={store.onDetail}
        getItemLayout={alculateHeight}
    />
);

const ClientItem = observer(({item, index, onPress}) => (
    <Touchable onPress={onPress} index={index} style={coreStyles.listItem} containerStyle={{borderRadius: 8}}>
        <ListTitle data={item}/>
        <View style={styles.row}>
            <View style={[styles.contentsingle, styles.left]}>
                <Icon name='flag' size={12} color={mainColors.primary1}/>
                <Text style={styles.text} numberOfLines={1}>{item.country || ""}</Text>
            </View>
            <View style={[styles.contentsingle, {flex: 1}]}>
                <Icon name='grav' size={12} color={mainColors.primary1}/>
                <Text style={styles.text}>{item.level || ""}</Text>
            </View>
        </View>
        <View style={[styles.row, styles.rightText]}>
            <Icon name='user-o' size={14} color={mainColors.primary1}/>
            <Text style={styles.text}
                  numberOfLines={1}>{item.defaultContact && item.defaultContact.localName ? item.defaultContact.localName : ""}</Text>
        </View>
    </Touchable>
));

const renderItem = props => (
    <ClientItem {...props} />
);



