/**
 * 商机列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import {Api} from "../../../extension";
import Paging from "../../../components/paging";
import {TouchDelay} from "../../../extension/decorate";

export class BusinessStore {
    paging:Paging;

    constructor(){
        this.paging = new Paging({
            destroy: false,
            uniqueKey: 'billId',
            host:Api.ERP,
            uri:"/business/getPage"
        });
    }

    @TouchDelay
    onDetail(item){
        //跳转到详情页面 等待后续开发
        // Actions.push('businessDetail',{item})
    }

}

export default new BusinessStore();
