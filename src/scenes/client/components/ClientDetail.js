/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-04 16:37
 */
import React from 'react';
import {View, StyleSheet, ScrollView, InteractionManager} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import clientDetailStore from './../store/ClientDetailStore';
import GridTile from "../../../components/grid/GridTile";
import styles from "../styles/ClientDetail.css";
import {Text} from "../../../components/ui";
import xt from "../../../extension";
import {mainColors} from "../../../styles/main.css";
import {specTxtMode} from "../../../components/grid/GridSingle";


@observer
export default class ClientDetail extends React.Component {
    constructor(props) {
        super(props);
        clientDetailStore.setOneData(props.item)
    }

    componentWillMount() {
        clientDetailStore.init();
    }

    componentDidMount() {
        let {item} = this.props;
        InteractionManager.runAfterInteractions(() => {
            clientDetailStore.getOne(item.id);
            clientDetailStore.getparTrmList(item.id);
        })
    }

    render() {
        let store = clientDetailStore;
        return (
            <ScrollView style={styles.container} alwaysBounceVertical={false}>
                <GridTile
                    data={store.oneData}
                    rows={store.baseDetailone}
                    titleStyle={{color: mainColors.mainText, textAlign: "left", paddingLeft: 16, paddingVertical: 10}}
                    subStyle={{color: mainColors.sub1Text, paddingRight: 16, paddingVertical: 10}}
                />
                <GridTile title='支付条款'
                          renderItem={specTxtMode}
                          rows={store.payTrmList}
                          viewHeader={false}
                          viewBottom={store.payTrmList.length != 0}
                          column={
                              [{
                                  key: 'localName',
                                  dataIndex: 'localName',
                                  tdStyle: {flex: 1}
                              }]
                          }
                />
                <View style={{height: 6}}/>
            </ScrollView>
        );
    }
}

ClientDetail.productSub = {
    getArgs: (props) => ({sourceId: props.item.id, dataTyId: 50}),
    pageArgs: {
        idName: 'mtlId'
    }
};