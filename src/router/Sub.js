/**
 *
 * @flow
 * @author tangzehua
 * @since 2017-05-30 22:29
 */
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Scene, Stack} from 'react-native-router-flux';
import {constant, mainColors, mainStyles} from './../styles/main.css';

import Login from './../scenes/login'
//common
import {ListSelect, ListSelectRight} from '../scenes/common';
//im
import {ImList} from '../scenes/im';
//客户
import Client, {ClientSub, ClientDetail} from '../scenes/client';
//产品
import Product, {ProductSub, ProductDetail, ProductPrice, ProductQuotation} from '../scenes/product';
//销售
import SaleOrder, {SaleOffer} from '../scenes/sales';
//供应商
import Supplier, {SupplierSub, SupplierDetail} from '../scenes/supplier';
//商机
import Business from '../scenes/business';
//推广报价
import PromoteQuotes from "../scenes/promote";

import {
    TopTabs, HideNav
} from './RConst';

type Param = {
    initKey: string
}

export default (props: Param) => ([
    <Scene key="login" component={Login} hideNavBar initial={props.initKey === 'login'}/>,
    <Scene key="listSelect" component={ListSelect} getTitle={props => props.title} right={ListSelectRight} r={0}/>,
    //im
    <Scene key="imList" component={ImList} title="消息"/>,
    //客户
    <Scene key="clientList" component={Client} title="客户"/>,
    <Scene key="sClientDetail" component={ClientDetail} title="客户详情"/>,
    <TopTabs key="clientDetail" title='客户' scrollEnabled={false}>
        <HideNav key="_clientDetail" component={ClientDetail} tabBarLabel="详情"/>
        <HideNav key="clientProductSub" component={ProductSub} tabBarLabel="产品" {...ClientDetail.productSub}/>
    </TopTabs>,
    //产品
    <Scene key="productList" component={Product} title="产品列表"/>,
    <Scene key="productPriceList" component={ProductPrice} title="产品价格"/>,
    <Scene key="productQuotation" component={ProductQuotation} title="产品报价"/>,
    <Scene key="sProductDetail" component={ProductDetail} title="产品详情"/>,
    <TopTabs key="productDetail" scrollEnabled={false} title='产品'>
        <HideNav key="_productDetail" component={ProductDetail} tabBarLabel="详情"/>
        <HideNav key="productSupplierSub" component={SupplierSub} tabBarLabel="相关供应商" {...ProductDetail.SupplierSub}/>
        <HideNav key="productClientSub" component={ClientSub} tabBarLabel="相关客户" {...ProductDetail.ClientSub} />
    </TopTabs>,
    //销售
    <Scene key="saleOrder" component={SaleOrder} title="销售订单"/>,
    <Scene key="saleOffer" component={SaleOffer} title="销售报价"/>,
    //供应商
    <Scene key="supplier" component={Supplier} title="供应商"/>,
    <Scene key="sSupplierDetail" component={SupplierDetail} title="供应商详情"/>,
    <TopTabs key="supplierDetail" scrollEnabled={false} title="供应商">
        <HideNav key="_supplierDetail" component={SupplierDetail} tabBarLable="详情"/>
        <HideNav key="clientProductSub" component={ProductSub} tabBarLabel="产品" {...SupplierDetail.productSub}/>
    </TopTabs>,
    //商机
    <Scene key="business" component={Business} title="商机列表"/>,
    <Scene key="promotequotes" component={PromoteQuotes} title="推广报价"/>,
]);

