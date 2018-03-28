/**
 *
 * @flow
 * @author houzhitao
 * @sine 2017-08-29 16:44
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import xt, {Api} from '../../../extension';
import {ApiGet} from '../../../extension/decorate';

const titleTextConst = {
    blue: true, fontSize: 16
};

class ProductDetailStore {

    normalRows: Array<> = [
        {key: 'code'},
        {key: 'localName', valueText: {blue: true, fontSize: 16}},
        {key: 'enName', valueText: {blue: true, fontSize: 14}}
    ];

    detailRows: Array<> = [
        {label: "产品类型", key: 'mtlType.localName'},
        {label: "CNS", key: 'cns'},
        {label: "INS", key: 'ins'},
        {label: "海关编码", key: 'hsCode'},
        {label: "产品等级", key: 'dataDiv.localName'},
        {label: "申报要素", key: 'rptMtl.localName'},
        {label: "商检", key: 'inspcMark'},
        {label: "生产标准", key: 'pPStd'},
        {label: "生产工艺", key: 'pProces.localName'},
    ];
    /*规格头部*/
    specHeaders: Array<> = [
        {label: '名称',key:"qaItem"},
        {label:"",key:"calSymBol"},
        {label: '指标',key:"testMeth"}
    ];

    @observable
    oneData: Object = {};
    @observable
    _specList:Array = []; /*产品规格*/
    @observable
    _contnrLoadingList:Array = [];/*包装及装箱数据*/

    @ApiGet(Api.DS, '/material/getOne', 'id')
    getOne (error, data) {
        if(error){
            xt.ui.showEToast(error);
        } else {
            this.setOneData(data.data);
        }
    }

    getSpecList = mtlId => {
        Api.get(Api.DS, "/mtlQaitem/getPage", {
            mtlId
        }).then(({data}) => {
            this.setSpecList(data.data)
        }).catch(xt.ui.showEToast);
    };

    getContnrLoadList = sourceId => {
        Api.get(Api.DS, "/contnrLoading/getPage", {
            sourceId,
            dataTyId: 20,
        }).then(({data}) => {
            this.setContnrLoadingList(data.data)
        }).catch(xt.ui.showEToast);
    };

    @action
    setOneData(one) {
        this.oneData = one || {};
    }
    @action
    setContnrLoadingList(list) {
        this._contnrLoadingList = list || [];
    }
    @action
    setSpecList (list) {
        this._specList = list || [];
    }


    @computed
    get specList(){
        return this._specList.slice();
    }
    @computed
    get contnrLoadingList(){
        return this._contnrLoadingList.slice();
    }

}

export default new ProductDetailStore();