/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-03 15:45
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import {Text} from '../../../components/ui';
import {mainColors} from './../../../styles/main.css';
import Touchable from '../../../components/touchable';
import moment from 'moment';

const List = observer(({item, index, store}) => (
    <Touchable index={index} id={item.id} onPress={store.onProduct} style={styles.listWarp}>
        <Text style={{color: mainColors.mainText, fontSize: 14,}}>{item.localName}</Text>
        <Text style={{color: mainColors.sub1Text, fontSize: 14,}}>{moment(item.updateDate).format("YYYY-MM-DD")}</Text>
    </Touchable>
));

export default observer(({store}) => (
    <View style={styles.container}>
        <View style={styles.titleWarp}>
            <Text blue>热销产品</Text>
            {/*<TouchableOpacity onPress={store.onProductMore}>*/}
                {/*<Text c1>更多 ></Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
        {
            (store.paging.dataList || []).length ?
                store.paging.dataList.map((item, index) => <List item={item} key={item.id} store={store}/>) :
                <Text c3 style={styles.emptyText}>暂无热销产品</Text>
        }
    </View>
));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 10,
    },

    emptyText: {
        padding: 5,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 12,
    },

    titleWarp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 12,
        marginLeft: 16,
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: mainColors.mainLine,
        marginBottom: 5,
    },

    listWarp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingVertical: 8,
        paddingRight: 10,
    },

    svgIcon: {
        backgroundColor: "#4795EB",
        padding: 15,
        margin: 5,
        borderRadius: 50,
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});