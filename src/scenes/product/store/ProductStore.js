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

export class ProductStore {
    paging: Paging;

    @observable
    pagingArgs:Object = {};

    constructor (){
        this.paging = new Paging({
            destroy: false,
            onDispose:this.dispose,
            host: Api.DS,
            uri: '/material/app/getPage'
        });
    }

    @TouchDelay
    onSearch = event => {
        this.setArgs({name:event.nativeEvent.text});
    };

    @action
    setArgs (args: Object){
        this.pagingArgs = Object.assign({},this.pagingArgs,args);
    };

    // @TouchDelay
    onDetail = (index: number) => {
        Actions.push("productDetail", {item: this.paging.dataList[index]});
    };

    @action
    dispose = (destory ?:boolean) => {
        destory && (this.pagingArgs = {});

    };

}

export default new ProductStore();
