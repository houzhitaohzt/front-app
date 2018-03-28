/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-04 16:37
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import xt, {Api} from "../../../extension";
import {ApiGet} from "../../../extension/decorate";
getValue = ({key,condition},data) => {
    let arr = data[key] || [],arr2 = [];
    arr.map(e => {
        if(e.linkType.id === condition) arr2.push(e.name);
    });
    return arr2.join("\n");
};


export class ClientDetailStore {
    baseDetailone:Array<> = [
        {label:"名称",key:"localName",line:true},
        {label:"国家",key:"country",line:true},
        {label:"等级",key:"cstmLevel",line:true},
        {label:"来源",key:"cstmCrsekt",space:true},

        {label:"固话",key:"contactList",line:true,getValue:getValue,condition:20},
        {label:"传真",key:"contactList",space:true,getValue:getValue,condition:30},
        {label:"邮箱",key:"contactList",space:true,getValue:getValue,condition:80},
        {label:"WEB",key:"contactList",space:true,getValue:getValue,condition:90},
        {label:"分管人",key:"staffsName",space:2}
    ];

    @observable
    oneData: Object = {};
    @observable
    _payTrmList:Array = [];

    @action
    init(){
        this.oneData = {};
    }

    getOne = id => {
        Api.get(Api.DS,"/customer/app/getDetail",{id:id}).then(({data})=>{
            this.setOneData(data)
        }).catch(xt.ui.showEToast)
    };

    getparTrmList = id => {
        Api.post(Api.DS,"/object/getMiniList",{
            "attrs":["payTrm.name"],
            "obj": "com.fooding.fc.ds.entity.TradrulePayterm",
            "queryParams":[{
            "attr":"sourceId",
            "expression":"=",
            "value":id
        }],
            "prettyMark":true
        }).then(({data}) => {
            this.setParTrmList(data);
        }).catch(xt.ui.showEToast)
    };

    @action
    setParTrmList = (list) => {
        this._payTrmList = list || [];
    };

    get payTrmList(){
        return this._payTrmList.slice();
    }

    @action
    setOneData(one) {
        this.oneData = one || {}
    }

}

export default new ClientDetailStore();
