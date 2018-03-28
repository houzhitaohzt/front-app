/**
 * 客户列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import {Api} from "../../../extension";
import Paging from "../../../components/paging";
import {TouchDelay} from "../../../extension/decorate";


export class ClientSubStore {
    paging:Paging;

    constructor(){
        this.paging = new Paging({
            host:Api.DS,
            uri:"/customer/getPage"
        });
    }

    // @TouchDelay
    onDetail = (index: number) => {
        Actions.push('sClientDetail',{item: this.paging.dataList[index]})
    }

}
