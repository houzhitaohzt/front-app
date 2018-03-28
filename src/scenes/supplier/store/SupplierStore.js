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

export class SupplierStore {
    paging:Paging;

    @observable
    pagingArgs:Object = {};
    searchValue:string = "";

    constructor(){
        this.paging = new Paging({
            destroy: false,
            onDispose:this.dispose,
            host:Api.DS,
            uri:"/vendor/app/getPage"
        });
    }

    @TouchDelay
    onSearch = (event) => {
        this.setArgs({name:event.nativeEvent.text});
    };

    @action
    setArgs = (args: Object) => {
        this.pagingArgs = Object.assign({},this.pagingArgs,args);
    };

    @TouchDelay
    onDetail(index) {
        Actions.push('supplierDetail',{item: this.paging.dataList[index]})
    };

    dispose = (destory ?: boolean)  => {
        destory && (this.pagingArgs = {});
    }

}

export default new SupplierStore();
