/**
 * 产品列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import {action, computed, observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {Api} from './../../../extension';
import Paging from '../../../components/paging';
import {TouchDelay} from '../../../extension/decorate'

export class productPriceStore {
    paging: Paging;

    @observable
    pagingArgs: Object = {};

    constructor (){
        this.paging = new Paging({
            destroy: false,
            onDispose:this.dispose,
            uniqueKey: 'billId',
            host: Api.ERP,
            uri: '/purquotation/getSalePage'
        });
    }

    // @TouchDelay
    onDetail = (index: number) => {
        //跳转到产品报价
        // Actions.push("productQuotation", {item});
    };
    @TouchDelay
    onSearch(event){
        this.setArgs({key: event.nativeEvent.text});
    }

    @action
    setArgs (args: Object){
        this.pagingArgs = Object.assign({}, this.pagingArgs, args);
    }

    @action
    dispose = (destroy ?: boolean)=>{
        destroy && (this.pagingArgs = {});
    }

}

export default new productPriceStore();
