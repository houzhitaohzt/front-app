/**
 * 供应商
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import {Api} from "../../../extension";
import Paging from "../../../components/paging";
import {TouchDelay} from "../../../extension/decorate";

export class SupplierSubStore {
    paging:Paging;

    constructor(){
        this.paging = new Paging({
            host:Api.DS,
            uri:"/vendor/getPage"
        });
    }

    // @TouchDelay
    onDetail(index: number) {
        Actions.push('sSupplierDetail',{item: this.paging.dataList[index]})
    }

}

export default new SupplierSubStore();
