/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-11 18:05
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import Dev from "../components/Dev";
import xt from '../../../extension';


export class DevStore {

    modal;
    @observable
    refresh: number = 0;

    @action
    onRefresh = () => {
        this.refresh++;
    };

    openHost = () => {
        let that = this;
        xt.ui.showSelectNormal("开配置", {
            value: xt.data.host,
            sections: xt.data.config.devApi.concat(xt.data.config.api),
            done: (value) => {
                xt.data.host = value;
                that.onRefresh();
            }
        })
    };

    openPort = () => {
        let that = this;
        xt.ui.showSelectNormal("请选择", {
            value: xt.data.uri.name,
            sections: ['fooding-ds', 'fooding-es', 'fooding_oa', 'fooding-mail', 'fooding-mail-server'],
            done: (value) => {
                xt.data.setUri({name: value});
                that.onRefresh();
            }
        })
    };

    onUriInput = text => {
        xt.data.setUri({value: text});
        this.onRefresh();
    };

    openDev = () => {
        this.modal && this.modal.open();
        // this.openHost();
    };

    closeDev = () => {
        this.modal && this.modal.close();
    };
}

export default new DevStore();