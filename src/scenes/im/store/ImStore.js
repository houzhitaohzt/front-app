/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-01 10:26
 */
import {Actions} from 'react-native-router-flux';
import {ListView} from 'react-native';
import moment from 'moment';
import {observable, action, computed} from 'mobx';
import {TouchDelay} from '../../../extension/decorate';

export type MessageListDefine = {
    avatar: string,
    title: string,
    subtitle: string,
    rightTitle: ?Date,
    badge: ?number,

    uri: ?string,
    icon: ?string,
    bottom: ?number,
}

class ImStore {

    @observable
    messageList: Array<MessageListDefine> = [
        //这里是固定的
        {title: "通知", icon: 'bell-o', uri: 'setting', badge: 5},
        {title: "公告", icon: 'bullhorn', uri: 'setting', bottom: true},

        {avatar: require('../../../assets/avatar/1.jpg'), title: '幂幂', subtitle: '回家吃饭了', rightTitle: "10:12", badge: 9},
        {avatar: require('../../../assets/avatar/2.png'), title: '亦菲', subtitle: '周末来玩啊', rightTitle: "昨天"},
        {avatar: require('../../../assets/avatar/3.jpg'), title: '心如', subtitle: '有个电影需要你合作哦, 佣金2000万, 适合亦菲搭档', rightTitle: "21:56"},
        {avatar: require('../../../assets/avatar/4.jpg'), title: '佟丽娅', subtitle: '好吧', rightTitle: "星期一", badge: 88},
        {avatar: require('../../../assets/images/default.png'), title: '戚薇', subtitle: '今晚下班一起去看电影哦, 不要忘记. 要不然今后都不要去了.', rightTitle: "2012-02-07"},
    ];

    constructor(){
        this.listDs = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
    }

    @computed
    get sections (){
        return this.messageList.slice();
    }

    @TouchDelay
    onMessage (item){
        Actions.push("imList", {title: item.title, avatar: item.avatar});
    }

}

export default new ImStore();
