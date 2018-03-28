/**
 * 销售订单
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import Paging from "../../../components/paging";
import {Api} from "../../../extension";
import {TouchDelay} from "../../../extension/decorate";


export class SaleOfferStore {
    paging:Paging;

    constructor(){
        this.paging = new Paging({
            destroy: false,
            uniqueKey: 'billId',
            host:Api.ERP,
            uri:"/saleoffer/getPage"
        })
    }

    @TouchDelay
    onDetail(index) {
        //跳转到详情页面,目前还么有做
        // Actions.push('saleofferDetail')
    }

}

export default new SaleOfferStore();
