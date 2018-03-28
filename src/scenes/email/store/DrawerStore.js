/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 17:30
 */
import {Actions} from 'react-native-router-flux';
import {action, computed, observable} from 'mobx';
import xt from '../../../extension';

export type MenuItemDefine = {
    title: string,
    icon: string,
    badge: ?number,
    bottom: ?boolean,
    key: string
}

const IconImage = {
    email: require("../../../assets/icons/mail-email.png"),
    sent2: require("../../../assets/icons/mail-sent2.png"),
    deleteRound: require("../../../assets/icons/mail-delete-round.png"),
    classify: require("../../../assets/icons/mail-classify.png"),
    trashCans: require("../../../assets/icons/mail-trash-cans.png"),
    contactPerson: require("../../../assets/icons/mail-contact-person.png"),
    sharedRecord: require("../../../assets/icons/mail-shared-record.png"),
    setting: require("../../../assets/icons/mail-setting.png"),
};

class DrawerStore {

    //菜单
    _menuList: Array<MenuItemDefine> = [
        {title: "收件箱", image: IconImage.email, key: 'onReceive'},
        {title: "已发送", image: IconImage.sent2, key: 'onSent'},
        {title: "已删除", image: IconImage.deleteRound, key: 'onRemove'},
        {title: "垃圾箱", image: IconImage.trashCans, key: 'onDustbin'},
        // {title: "草稿箱", icon: 'draft-box', key: 'goTo'},
        // {title: "联系人", image: IconImage.contactPerson, key: 'goTo', bottom: true},

        // {title: "我的分类", image: IconImage.classify, key: 'goTo', tintColor: '#8C949B'},
        // {title: "共享记录", image: IconImage.sharedRecord, key: 'goTo', tintColor: '#8C949B'},
        // {title: "设置", image: IconImage.setting, key: 'goTo', tintColor: '#8C949B'},
    ];

    @observable
    mailListVisible: boolean = false;//显示邮件选择列表

    @observable
    _badge: Map<string, Map> = new Map(); //所有邮件badge
    @observable
    _currentMail: string = null; //当前选择的邮件

    @computed
    get mailList (): Array<string> {
        return xt.data.user.emails || [];
    }

    @computed
    get currentMail (): string {
        return this._currentMail || this.mailList[0];
    }

    @computed
    get badge (): Map<string, Map> {
        if( !this._badge.has(this.currentMail))
            this._badge.set(this.currentMail, new Map([["onReceive", 0], ['onRemove', 0]]));
        return this._badge;
    }

    @computed
    get menuList (){
        return this._menuList.map(da => ({...da, badge: this.getBadgeByName(da.key)}));
    }

    @computed
    get currentBadge (){
        return this.badge.has(this.currentMail)? this.badge.get(this.currentMail): new Map();
    }

    @computed
    get currentMailList (){
        return Array.from(this.mailList).filter(da => da !== this.currentMail).map(da => {
            //计算所有邮箱的标志状态
            let badge = 0, list;
            if(this.badge.has(da)){
                list = this.badge.get(da);
                for(let [k, v] of list.entries()){
                    badge = v? v: 0;
                }
            }
            return { mail: da, badge}
        });
    }

    //获取当前邮件的指定菜单badge值
    getBadgeByName (name){
        let cBadgeMap = this.currentBadge;
        return cBadgeMap.has(name) ? cBadgeMap.get(name): 0;
    }

    @action
    onMailListVisible = ()=>{
        this.mailListVisible = !this.mailListVisible;
    };

    @action
    switchMail = (index: number)=> {
        this._currentMail = this.currentMailList[index].mail;
        this.onMailListVisible();
    };

    @action
    onOpenDrawer = (): void => {
        this.mailListVisible = false;
        Actions.drawerOpen();
    };

    onCloseDrawer = (): void => {
        Actions.drawerClose();
    };

    goTo = () => {
        xt.ui.showToast("后续版本开放! 敬请期待!");
    };

    onDustbin = () => {
        Actions.push("mailDustbin");
    };

    onReceive = () => {
        Actions.push("mailReceive");
    };

    onSent = () => {
        Actions.push("mailSent");
    };

    onRemove = () => {
        Actions.push("mailRemove");
    };
}

export default new DrawerStore();
