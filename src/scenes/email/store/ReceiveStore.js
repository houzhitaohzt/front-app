/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 17:17
 */
import {Actions} from 'react-native-router-flux';
import {action, computed, observable} from 'mobx';
import xt, {Api} from './../../../extension';
import {TouchDelay} from '../../../extension/decorate';
import Paging from '../../../components/paging';

class ReceiveStore {

    tipMenu: Array<> = [
        {label: "全部", value: ''},
        {label: "未读", value: false},
    ];

    swipeable = null;//侧滑组件

    tipMenuValue: Object = null;
    @observable
    selectTipVisible: boolean = false;
    @observable
    markRead: string|boolean;

    paging: Paging;
    @observable
    currentMail: string;

    constructor (){
        let that = this;
        that.tipMenuValue = that.tipMenu[0];
        that.paging = new Paging({
            destroy: false,
            host: Api.MAIL,
            uri: '/box/getList',
            defaultArgs: {
                box: 'RECEIVE'
            }
        });
    }

    @action
    initData (currentMail: string): void{
        let that = this;
        that.currentMail = currentMail;
        that.selectTipVisible = false;
        that.tipMenuValue = that.tipMenu[0];
        that.markRead = that.tipMenuValue.value;
        Actions.refresh({selectTipVisible: that.selectTipVisible});
    }

    @action
    onTipMenu = (item)=> {
        let that = this;
        that.markRead = item.value;
        that.tipMenuValue = item;
        that.onHideSelectTip();
    };

    @action
    onHideSelectTip = ()=>{
        this.selectTipVisible = false;
        Actions.refresh({selectTipVisible: this.selectTipVisible});
    };

    //收件箱标题菜单事件
    @action
    onTitleMenu = ()=>{
        this.selectTipVisible = !this.selectTipVisible;
        Actions.refresh({selectTipVisible: this.selectTipVisible});
    };

    onWrite = ()=>{
        Actions.push("mailWrite");
    };

    onSearch = ()=> {
        Actions.push("mailSearch");
    };

    /**
     * 单行点击
     * @param index
     */
    @TouchDelay
    onRowItem = (index: number): void => {
        let item = this.paging.dataList[index];
        this.onReader(item);
        Actions.push("mailDetail", {item});
    };

    @action
    onReader (item: Object): void {
        item.markRead = true;
    }

    /**
     * 删除邮件
     * @param index
     */
    onDelete = (index: number): void => {
        xt.ui.showToast("后续版本开放! 敬请期待!");
    };

    /**
     * 回复
     * @param index
     */
    onReply = (index: number): void => {
        this.recenterSwipeable();
        let item = this.paging.dataList[index];
        Actions.push('mailWrite', {
            subject: `Re:${item.subject}`,
            type: 'reply',
            id: item.id,
            to: item.sendMail
        });
    };

    /**
     * 转发
     * @param index
     */
    onForward = (index: number): void => {
        this.recenterSwipeable();
        let item = this.paging.dataList[index];
        Actions.push('mailWrite', {
            subject: `Fw:${item.subject}`,
            type: 'forward',
            id: item.id
        });
    };

    /**
     * 星标
     * @param item
     */
    onStar = (item: Object): void => {
        xt.ui.showToast("后续版本开放! 敬请期待!");
    };

    /**
     * 关闭侧滑
     */
    recenterSwipeable = (): void => {
        this.swipeable && this.swipeable.recenter();
        this.swipeable = null;
    };

    @computed
    get pagingArgs (){
        return {userAddress: this.currentMail, markRead: this.markRead}
    }
}

export default new ReceiveStore();
