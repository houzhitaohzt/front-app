/**
 * 客户产品列表
 * @flow
 * @author tangzehua
 * @sine 2017-08-29 10:32
 */
import {action, computed, observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {Api} from './../../../extension';
import Paging from '../../../components/paging';
import {TouchDelay} from '../../../extension/decorate'


export class ProductSubStore {
    paging: Paging;
    pageArgs: Object;

    /*/beMtl/getPage*/
    constructor (pageArgs: Object = {}){
        this.pageArgs = pageArgs;
        this.paging = new Paging({
            host: Api.DS,
            uri: '/beMtl/app/getPage'
        });
    }

    // @TouchDelay
    onDetail = (index: number) => {
        Actions.push("sProductDetail", {item: this.paging.dataList[index], pageArgs: this.pageArgs});
    };

}

export default new ProductSubStore();
