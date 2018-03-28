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


export class ClientStore {
    paging:Paging;

    @observable
    pagingArgs: Object = {};

    constructor(){
        this.paging = new Paging({
            destroy: false,
            onDispose: this.dispose,
            host:Api.DS,
            uri:"/customer/app/getPage"
        });
    }

    @TouchDelay
    onSearch(event){
        this.setArgs({name: event.nativeEvent.text});
    }

    @TouchDelay
    onDetail(index: any) {
        Actions.push('clientDetail',{item: this.paging.dataList[index]});
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

export default new ClientStore();
