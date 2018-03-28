/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-11 16:49
 */
import {action, computed, observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {Api} from './../../../extension';
import Paging from '../../../components/paging';
import {TouchDelay} from '../../../extension/decorate'

type PagingArgsDefinition = {
    userAddress: string
}

export class SentStore {
    paging: Paging;

    constructor (){
        this.paging = new Paging({
            destroy: false,
            host: Api.MAIL,
            uri: '/box/getList',
            defaultArgs: {
                box: 'TRASH'
            }
        });
    }

    // @TouchDelay
    onDetail = (index: number) => {
        Actions.push("mailDetail", {item: this.paging.dataList[index]});
    };
}

export default new SentStore();
