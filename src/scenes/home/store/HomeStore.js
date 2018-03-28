/**
 * 首页
 * @flow
 * @author tangzehua
 * @sine 2017-08-03 15:39
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import xt, {Api} from '../../../extension';
import {ApiGet} from '../../../extension/decorate';
import Paging from '../../../components/paging';

export type ControlMenuDefine = {
    title: string,
    icon: string,
}

export type ProductDefine = {
    name: string,
    time: string,
}
const menuArray: Array<ControlMenuDefine> = [
    {title: '客户', icon: 'h-company', key: "clientList"},
    {title: '产品', icon: 'h-product', key: "productList"},
    {title: '销售报价', icon: 'h-sale-offer', key: 'saleOffer'},
    {title: '供应商', icon: 'h-supplier', key: 'supplier'},
    {title: '产品价格', icon: 'h-product-pirce', key: 'productPriceList'},
    {title: '商机', icon: 'h-business', key: 'business'},
    {title: '销售订单', icon: 'h-sale-order', key: 'saleOrder'},
    {title: '推广报价', icon: 'h-promote-price',key:'promotequotes'},
    // {title: '活动', icon: 'h-activity',key:"activity"},
    // {title: '服务机构', icon: 'h-service-org',key:'a'},
    // {title: '货代公司', icon: 'h-freight-company',key:'a'},
    // {title: '竞争对手', icon: 'h-competitor',key:'a'}
];

class HomeStore {
    paging: Paging;

    @observable
    menuArray: Array<Object> = [];

    constructor (){
        this.paging = new Paging({
            pageSize: 10,
            host: Api.DS,
            uri: "/platformHotMaterial/getPage"
        });
    }

    @action
    init(){
        this.menuArray = menuArray.filter(e => xt.data.hasMenu(e.key))
    }

    /**
     * /autoReceive
     * 自动收邮件
     */
    autoMail (): void {
        let that = this;
        //调试模式的时候不自动收邮件
        if( !(xt.data.user.emails || []).length || __DEV__) return;
        let auto = () => xt.data.user.emails.forEach(mail => that.autoReceive(mail));
        that._autoMailTimeout = setInterval(auto, xt.constant.AUTO_MAIL);
        auto();
    }

    @ApiGet(Api.MAIL_SERVER, '/autoReceive', 'email')
    autoReceive (error, data): void {
        error && console.log("自动收邮件: ", error)
    }

    onProduct = (index, id) => {
        // Actions.push('productDetail', {item});
    };

    onProductMore = ()=>{
        // Actions.push('productList');
    };

    @action
    onCMenuPress = (item) => {
        if(item.key) {
            Actions.push(item.key);
        } else {
            xt.ui.showToast("后续版本开放! 敬请期待!");
        }
    };

    dispose (): void {
        clearTimeout(this._autoMailTimeout);
    }

}

export default new HomeStore();
