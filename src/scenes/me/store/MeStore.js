/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-01 10:26
 */
import {ListView} from 'react-native';
import {action, computed, observable} from 'mobx';
import {TouchDelay} from '../../../extension/decorate';

import xt from './../../../extension';

type MenuItem = {
    title: string,
    icon: string,
    onClick: string
}

class MeStore {

    @observable
    menuList: Array<MenuItem> = [
        // {title: "企业通讯录", icon: 'book', key: 'onSetting'},
        // {title: "意见反馈", icon: 'file-zip-o', key: 'onContacts'},
        // {title: "设置", icon: 'gear', key: 'onFeedback'},
        // {title: "退出登录", icon: 'sign-out', key: 'onLogout'}
    ];

    @computed
    get sections (){
        return this.menuList.slice();
    }

    @TouchDelay
    onMenuPress = (item: MenuItem): void => {
        switch (item.key){
            case 'onLogout':
                xt.data.logout();
                break;
            default:
                xt.ui.showToast('后续版本开放! 敬请期待!');
                break;
        }
    };

    onCheckWork = ()=>{
        // xt.ui.showToast('后续版本开放! 敬请期待!');
        xt.data.logout();
    }
}

export default new MeStore();
