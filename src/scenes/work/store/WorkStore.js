/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-01 10:26
 */
import {Actions} from 'react-native-router-flux';
import {ListView} from 'react-native';
import {observable, action, computed} from 'mobx';
import xt from '../../../extension'

export type MenuItemDefine = {
    title: string,
    icon: string,
    uri: string,
    key:string, //用于路由
    bottom: ?number,
}

export type MenuDefine = {
    title: string,
    data: MenuItemDefine
}

const IconImage = {
    client: require("../../../assets/icons/wk-client.png"),
    product: require("../../../assets/icons/wk-product.png"),
    supplier: require("../../../assets/icons/wk-supplier.png"),
    saleOrder: require("../../../assets/icons/wk-sale-order.png"),
    saleOffer: require("../../../assets/icons/wk-sale-offer.png"),
    productPrice: require("../../../assets/icons/wk-product-price.png"),
    promotePrice: require("../../../assets/icons/wk-promote-price.png"),
};

const menuList: Array<MenuDefine> = [
    // {title: "资源平台", data: [
    //     {title: "数据统计", icon: 'gear', uri: 'setting', bottom: true},
    //     {title: "市场活动", icon: 'git', uri: 'setting'},
    //     {title: "商机", icon: 'history', uri: 'setting', bottom: true},
    //     {title: "采购报价", icon: 'angellist', uri: 'setting'},
    //     {title: "自动报价", icon: 'heartbeat', uri: 'setting'},
    //     {title: "收到的自动报价", icon: 'skyatlas', uri: 'setting'},
    //     {title: "发出的自动报价", icon: 'venus-double', uri: 'setting'},
    //     {title: "销售报价", icon: 'pinterest-p', uri: 'setting'},
    //     {title: "销售订单", icon: 'whatsapp', uri: 'setting', bottom: true},
    //     {title: "客户", icon: 'bicycle', uri: 'setting'},
    //     {title: "产品", icon: 'gg', uri: 'setting'},
    //     {title: "联系人", icon: 'tripadvisor', uri: 'setting'}
    // ]},
    {title:"基础数据",data: [
        {title: "客户", image: IconImage.client, key:"clientList"},
        {title: "产品", image: IconImage.product, key:"productList"},
        {title: "供应商", image: IconImage.supplier,key:"supplier"},
    ]},
    {title:"业务管理", data:[
        {title: "销售订单", image: IconImage.saleOrder, key:"saleOrder"},
        {title: "销售报价", image: IconImage.saleOffer,key:"saleOffer"},
        {title: "产品价格", image: IconImage.productPrice, key:"productPriceList"},
    ]},
    {title:"市场管理",data:[
        {title: "商机", image: IconImage.promotePrice, key:"business"},
        {title: "推广报价", image: IconImage.promotePrice, key:"promotequotes"},
    ]},
    // {title: "平台应用", data: [
    //     {title: "平台产品", icon: 'safari', uri: 'setting', bottom: true},
    //     {title: "平台报价", icon: 'map-signs', uri: 'setting'},
    // ]},
    // {title: "公共询盘", data: [
    //     {title: "发出的询盘", icon: 'television', uri: 'setting'},
    //     {title: "收到的询盘", icon: 'envira', uri: 'setting'},
    //     {title: "发出的报价", icon: 'glide-g', uri: 'setting'},
    //     {title: "收到的报价", icon: 'yoast', uri: 'setting'},
    // ]},
    // {title: "私有询盘", data: [
    //     {title: "发出的询盘", icon: 'pied-piper', uri: 'setting'},
    //     {title: "收到的询盘", icon: 'deaf', uri: 'setting'},
    //     {title: "发出的报价", icon: 'superpowers', uri: 'setting'},
    //     {title: "收到的报价", icon: 'houzz', uri: 'setting'},
    // ]}
];

class WorkStore {

    @observable
    _sections: Array<Object> = [];

    @action
    init (){
        let menuArr = [];
        menuList.forEach(ck => {
            let ary = [];
            ck.data.forEach(menu => {
                if(xt.data.hasMenu(menu.key)){
                    ary.push(menu);
                }
            });
            ary.length &&  menuArr.push({...ck, data: ary});
        });
        this._sections = menuArr;
    }

    @computed
    get sections (){
        return this._sections.map(da => ({ ...da, data: da.data.slice() }))
    }

    @action
    onCMenuPress = (item) => {
        if(item.key) {
            Actions.push(item.key);
        } else {
            xt.ui.showToast("后续版本开放! 敬请期待!");
        }
    };

}

export default new WorkStore();
