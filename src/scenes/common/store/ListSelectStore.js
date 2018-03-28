/**
 * 多选列表
 * @flow
 * @author tangzehua
 * @sine 2017-09-19 16:56
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import xt, {Api} from '../../../extension';
import Paging from '../../../components/paging';


export type SelectDefinition = {
    single ?: boolean, //是否为单选
    done: (data: Array<Object>) => void,
};

export class SelectStore {
    storeList: (Map<string, SelectListStore>) = new Map();
    isDispose: boolean =  true;
    data: Array<Object> = [];
    single = false;
    done = xt.noop;

    init (selectArgs: SelectDefinition = {}): void {
        let that = this;
        if( !that.isDispose) return;
        that.isDispose = false;

        for(let [k, v] of Object.entries(selectArgs)){
            this[k] = v;
        }
        that.data = (that.data || []).slice();
        Actions.refresh({r: that.data.length});
    }

    onSave = (): void => {
        this.done(this.data.slice());
        Actions.pop();
        Actions.currentScene.endsWith("_") && Actions.pop();
    };

    @action
    onSelect = (item: Object, uniqueKey: string): void => {
        let that = this, ix = -1, isSingle = that.single;

        if((ix = that.data.findIndex(da => da[uniqueKey] === item[uniqueKey])) !== -1){
            that.data.splice(ix, 1);
            item._select = false;
        } else {
            that.data.push(item);
            item._select = true;
        }
        Actions.refresh({r: that.data.length});
    };

    get dataSize (){
        return this.data.length;
    }

    getStore (args: Paging) {
        if(this.storeList.has(args.uri)){
            return this.storeList.get(args.uri);
        } else {
            let store = new SelectListStore(this);
            this.storeList.set(args.uri, store);
            return store;
        }
    }

    //paging 销毁
    @action
    dispose = (): void => {
        let that = this;
        if( that.isDispose) return;
        that.isDispose = true;
        that.data = [];
        that.done = xt.noop;
        that.single = false;
    };
}

export class SelectListStore {

    store: SelectStore;
    paging: Paging;
    @observable
    searchArgs: Object = {};
    singleArgs: Object = {
        searchName: 'name'
    };

    constructor (store){
        this.store = store;
    }

    @action
    init (pagingArgs: Paging, singleArgs ?: Object = {}): void {
        let that = this;
        if( !that.paging || that.paging.uri !== pagingArgs.uri){
            that.paging = new Paging({
                destroy: false,
                pageSize: 15,
                execData: that.execData,
                ...pagingArgs
            });
            that.searchArgs = Object.assign({}, that.searchArgs, pagingArgs.defaultArgs);
            that.singleArgs = Object.assign({}, that.singleArgs, singleArgs);
        } else {
            that.paging.dataList = that.paging.dataList.map(that.execData);
        }
    }

    execData = (data: Object)=> {
        let uniqueKey = this.paging.uniqueKey;
        data._select = ~this.store.data.findIndex(da => da[uniqueKey] === data[uniqueKey]);
        return data;
    };

    onSelect = (index: number): void => {
        let that = this, isSingle = that.single, item = that.paging.dataList[index];
        that.store.onSelect(item, that.paging.uniqueKey);
    };

    @action
    onSearch = (event): void => {
        let that = this;
        let searchName = that.singleArgs.searchName || 'name';
        that.searchArgs = Object.assign({}, that.searchArgs, {[searchName]: event.nativeEvent.text || ''});
    };
}

export default new SelectStore();