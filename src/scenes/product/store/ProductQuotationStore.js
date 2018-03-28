/**
 * 产品报价
 * @flow
 * @author houzhitao
 * @sine 2017-08-29 10:32
 */
import {action, computed, observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {Api} from './../../../extension';
import Paging from '../../../components/paging';
import {TouchDelay} from '../../../extension/decorate'

export class productQuotationStore {
    paging: Paging;

    constructor (){
        this.paging = new Paging({
            uniqueKey: 'billId',
            host: Api.ERP,
            // uri: '/promoteprice/getCustomerOffers'
            uri: '/purquotation/getSalePage'
        });
    }

    @TouchDelay
    onProQuoDel (item) {

    }

}

export default new productQuotationStore();
