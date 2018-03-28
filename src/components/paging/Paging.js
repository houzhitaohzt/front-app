/**
 * 分页数据
 * @flow
 */
import {observable, action, computed} from 'mobx';
import {Api} from '../../extension';

export default class Paging<T> {
    /**
     * 唯一 key
     * @type {string}
     */
    uniqueKey: string = 'id';
    /**
     * 销毁全部数据, 如果为false则销毁部分数据
     * @type {boolean}
     */
    destroy: boolean = true;
    /**
     * 数据最大上限
     * @type {number}
     */
    limitSize: number = 1000;
    /**
     * 当前页数
     * @type {number}
     */
    @observable
    currentPage: number = 1;
    /**
     * 单页数据量
     * @type {number}
     */
    pageSize: number = 10;
    /**
     * 数据总行数
     * @type {number}
     */
    @observable
    totalRecords: number = 0;
    /**
     * 是否分页
     * @type {boolean}
     */
    @observable
    isPagable: boolean = true;
    /**
     * 数据是否正在加载
     * @type {boolean}
     */
    @observable
    isLoading: boolean = false;
    @observable
    isRefreshing: boolean = false;
    @observable
    isNextLoading: boolean = false;
    /**
     * 数据集合
     * @type {Array}
     */
    @observable
    dataList: (Array<T> | null) = null;
    /**
     * 数据dataList默认对象值
     * @type {null}
     */
    keyExtractor: Array<string> = null;
    /**
     * 数据回来后. 处理数据
     * @type {null}
     */
    execData: (data: Object, index: number)=> Object = null;
    /**
     * 目标接口
     * @type {null}
     */
    host: string = null;
    /**
     * 目标接口
     * @type {null}
     */
    uri: string = null;
    /**
     * 默认参数, 可被覆盖
     * @type {{}}
     */
    defaultArgs: Object = {};
    /**
     * 上一次请求参数, 不包括 defaultArgs
     * @type {null}
     */
    lastArgs: Object = null;

    /**
     * 销毁回调通知
     */
    onDispose: (destroy ?: boolean)=> void;

    /**
     * 是否已经销毁
     * @type {boolean}
     * @private
     */
    _isDispose: boolean = false;

    /**
     * 初始化
     * @param data
     */
    constructor(data: Paging = {}): Paging {
        for(let [k, v] of Object.entries(data)){
            this[k] = v;
        }
    }

    @action
    setData = (data: Array<T>) => {
        this.dataList = this.execData? data.map(this.execData): data;
        console.log(`Paging Response Size ${data.length}`)
    };

    @action
    appendData = (data: Array<T>) =>{
        let that = this;
        let newData = data.filter(da => that.dataList.findIndex(md => md[that.uniqueKey] !== da[that.uniqueKey]) !== -1);
        that.dataList = that.dataList.concat(that.execData? newData.map(this.execData): newData);
        console.log(`Paging Total Size ${that.dataList.length} Response Size ${data.length}`)
    };

    /**
     * 分页查询下一页
     * 注意回调方法并发操作
     * @param args
     * @param resolve
     * @param reject
     * @returns {void}
     */
    async fetchNext(args: Object = {}, resolve :? (data: Array<T>|null) => void, reject :? (error: string) => void): void {
        let that = this;
        if (that.isLoading || !that.isNextPage) return;
        that.lastArgs = args;
        args = Object.assign({currentPage: that.nextPage}, args);
        that.setNextLoading(true);
        try {
            let data = await that.fetchPaging(args);
            !that._isDispose && that.appendData(data);
            resolve && resolve(data);
        } catch (e) {
            reject && reject(e);
        } finally {
            that.setNextLoading(false);
        }
    }

    /**
     * 查询第一页的数据
     * 注意回调方法并发操作
     * @param args
     * @param resolve
     * @param reject
     * @returns {Promise.<void>}
     */
    async fetchFirst(args: Object = {}, resolve ?: (data: Array<T>|null)=> void, reject ?: (error: string) => void): void {
        let that = this;
        if (that.isLoading) return;
        that.lastArgs = args;
        args = Object.assign({currentPage: 1}, args);
        that.setRefreshing(true);
        try {
            let data = await that.fetchPaging(args);
            !that._isDispose && that.setData(data);
            resolve && resolve(data);
        } catch (e) {
            reject && reject(e);
        } finally {
            that.setRefreshing(false);
        }
    }

    /**
     * 查询分页数据
     * 注意回调方法并发操作
     * @param args
     * @returns {Promise.<void>}
     */
    fetchPaging(args: Object = {}): Promise {
        let that = this;
        that._isDispose = false;
        let params = Object.assign({pageSize: that.pageSize}, that.defaultArgs, args);
        return new Promise(async (resolve, reject) => {
            try {
                let {data} = await Api.get( that.host, that.uri, params);
                data = Array.isArray(data) ? {data: data}: data;
                !that._isDispose && that.setPaging(data);
                resolve(!that._isDispose ? (data.data || []) : null);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * 根据接口数据设置分页数据
     * @param data
     */
    @action
    setPaging(data: Paging): void {
        let that = this;
        that.totalRecords = data.totalRecords;
        //计算分页
        let pageNumber = Math.ceil(data.totalRecords / data.pageSize);
        that.currentPage = pageNumber > data.currentPage ? data.currentPage : pageNumber;
    }

    @action
    setLoading(loading: boolean): void {
        this.isLoading = loading;
    }

    @action
    setNextLoading(loading: boolean): void {
        this.isLoading = loading;
        this.isNextLoading = loading;
    }

    @action
    setRefreshing(refreshing: boolean): void {
        this.isLoading = refreshing;
        this.isRefreshing = refreshing;
    }

    /**
     * 下一页
     * @returns {number}
     */
    @computed
    get nextPage(): number {
        return this.currentPage > 0 ? this.currentPage + 1 : 1;
    }

    /**
     * 是否还有下一页
     * @returns {boolean}
     */
    @computed
    get isNextPage(): boolean {
        return !this.isLimitPage && Math.ceil(this.totalRecords / this.pageSize) > this.currentPage;
    }

    /**
     * 是否被限制加载
     * @returns {boolean}
     */
    @computed
    get isLimitPage(): boolean {
        return (this.dataList || []).length >= this.limitSize;
    }

    /**
     * 分页底条是否显示
     * @returns {boolean|Array.<T>}
     */
    @computed
    get tailVisible(): boolean {
        return !this.isRefreshing && this.dataList && this.dataList.length > 0
    }

    /**
     * 销毁部分数据, 保留一页数据
     * @param {boolean} {destroy} 是否销毁全部数据
     */
    @action
    dispose(destroy ?: boolean = this.destroy): void {
        let that = this;
        if (that._isDispose) return;
        that._isDispose = true;
        if (destroy) {
            that.dataList = null;
            that.lastArgs = null;
        } else if(that.currentPage > 1){
            that.dataList = that.dataList && that.dataList.slice(0, that.pageSize);
        }
        that.currentPage = 1;
        that.onDispose && that.onDispose(destroy);
        console.log(`--销毁Paging (${destroy})--`);
    }
}
