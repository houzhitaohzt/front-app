/**
 *供应商详情
 * @flow
 * @author houzhitao
 * @sine 2017-09-04 16:37
 */
import React from 'react';
import {View, StyleSheet, ScrollView, InteractionManager} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import supplierDetailStore from './../store/SupplierDetailStore';
import GridTile from "../../../components/grid/GridTile";
import styles from "../styles/SupplierDetail.css";
import {Text} from "../../../components/ui";
import xt from "../../../extension";
import {mainColors} from "../../../styles/main.css";
import {specTxtMode} from "../../../components/grid/GridSingle";


@observer
export default class SupplierDetail extends React.Component {
    constructor(props) {
        super(props);
        supplierDetailStore.setOneData(props.item)
    }

    componentWillMount(){
        supplierDetailStore.init();
    }

    componentDidMount() {
        let {item} = this.props;
        InteractionManager.runAfterInteractions(() => {
            supplierDetailStore.getOne(item.id);
            supplierDetailStore.getparTrmList(item.id);
        })
    }

    render() {
        let that = this;
        let store = supplierDetailStore;
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

SupplierDetail.productSub = {
    getArgs: (props)=> ({sourceId: props.item.id, dataTyId:70}),
    pageArgs: {
        idName: 'mtlId'
    }
};

