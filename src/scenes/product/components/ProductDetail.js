/**
 * 产品列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import React from 'react';
import {View, StyleSheet, ScrollView, InteractionManager} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import GridTile from '../../../components/grid/GridTile';
import productDetailStore from './../store/ProductDetailStore';
import styles from '../styles/ProductDetail.css';
import {Text} from '../../../components/ui'
import xt from '../../../extension';
import {mainColors} from '../../../styles/main.css';
import { specTxtMode } from "../../../components/grid/GridSingle";


@observer
export default class ProductDetail extends React.Component {

    constructor(props){
        super(props);
        productDetailStore.setOneData(props.item);
    }

    componentDidMount() {
        let {item, pageArgs = {}} = this.props;
        let mtlId = item[pageArgs.idName || 'id'];
        InteractionManager.runAfterInteractions(()=>{
            productDetailStore.getOne(mtlId);
            productDetailStore.getSpecList(mtlId);
            productDetailStore.getContnrLoadList(mtlId);
        });
    }

    description = data => (
        <Text c1 style={styles.description}>{data.description}</Text>
    );
    useTxtMode = (List) => {
        return (<View style={styles.useTxtContent}  >
            {List.map((e,i) => (<View style={styles.useTxtSingle} key={i}><Text style={styles.useTex}>{e.localName || e.name}</Text></View>))}
        </View>)
    };

    render() {
        let that = this;
        let {item} = this.props;
        let store = productDetailStore;
        return (
            <ScrollView style={styles.container}  alwaysBounceVertical={false}>
                <GridTile data={item} rows={store.normalRows} rowSpace={2} viewHeader viewBottom />
                <GridTile title='产品常规' data={store.oneData} rows={store.detailRows} viewBottom/>
                <GridTile title='产品规格'
                          header={store.specHeaders}
                          renderItem={specTxtMode}
                          rows={store.specList}
                          viewBottom ={!!store.specList.length}
                          column = {
                              [{
                                  key: 'qaItem',
                                  dataIndex: 'qaItem',
                                  thStyle: {flex: 1.1, textAlign: "right"},
                                  tdStyle: {flex: 1.1, textAlign: "right"}
                              },{
                                  key:'calSymBol',
                                  dataIndex:'calSymBol',
                                  thStyle:{width:20,textAlign:'center'},
                                  tdStyle: {width:20,textAlign:'center'},
                              },{
                                  key:'testMeth',
                                  dataIndex:'testMeth',
                                  thStyle:{flex:1,textAlign:'left'},
                                  tdStyle: {flex:1,textAlign:'left'},
                              }]
                          }
                />
                <GridTile title='包装及装箱数据'
                          renderItem={specTxtMode}
                          rows={store.contnrLoadingList}
                          viewBottom={!!store.contnrLoadingList.length}
                          column = {
                              [{
                                  key: 'packaging',
                                  dataIndex: 'packaging',
                                  tdStyle: {flex: 2, textAlign: "left"}
                              },{
                                  key:'unitofmea',
                                  dataIndex:'unitofmea',
                                  tdStyle: {flex:1,textAlign:'right'},
                              }]
                          }
                />
                <GridTile title={"用途"}
                          data={store.oneData.dataMulDiv1s || []}
                          content={that.useTxtMode} viewBottom={!!(store.oneData.dataMulDiv1s || []).length} />
                <GridTile title='描述' content={that.description} data={store.oneData}/>
                <View style={{height: 6}}/>
            </ScrollView>
        );
    }
}

ProductDetail.ClientSub = {
    getArgs: ({item, pageArgs = {}}) => ({mtl: item[pageArgs.idName || 'id']}),
};
ProductDetail.SupplierSub = {
    getArgs: ({item, pageArgs = {}}) => ({mtl: item[pageArgs.idName || 'id']})
};