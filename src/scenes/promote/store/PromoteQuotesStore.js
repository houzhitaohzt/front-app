/**
 *
 * @flow
 * @author houzhitao
 * @sine 2017-09-25 09:55
 */
import {action, computed, observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {Api} from './../../../extension';
import Paging from '../../../components/paging';
import {TouchDelay} from "../../../extension/decorate";

class PromoteQuotes {
    paging: Paging;

    @observable
    pagingArgs: Object = {};

    constructor (){
        this.paging = new Paging({
            onDispose: this.dispose,
            uniqueKey: 'mtlId',
            host: Api.ERP,
            uri: '/promoteprice/getCustomerOffers'
        });
    }

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

export default new PromoteQuotes();