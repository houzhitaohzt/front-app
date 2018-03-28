/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-03 15:39
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import xt, {Api} from '../../../extension';
import {TouchDelay} from '../../../extension/decorate';

export class TopMenuStore {

    @observable
    mailNum: number = 0;//邮件数

    @observable
    taskNum: number = 0;//任务数

    @observable
    scheduleNum: number = 0;//日常数

    @TouchDelay
    onMailPress = (): void => {
        Actions.push("email");
    };

    @TouchDelay
    onTaskPress = (): void =>{
        xt.ui.showToast("后续版本开放! 敬请期待!");
    };

    @TouchDelay
    onSchedulePress = (a, b, c)=>{
        xt.ui.showToast("后续版本开放! 敬请期待!");
    };
}

export default new TopMenuStore();
