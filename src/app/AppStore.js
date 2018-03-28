/**
 *
 * @flow
 */
import { observable, action} from 'mobx';

type StatusBarDefinition = {
    visible: boolean,
    barStyle: string,
}

type AppInitDefinition = {
    key ?: string,
    statusBar ?: StatusBarDefinition,
}

const defaultBarStyle = 'light-content';

class AppStore {

    @observable
    initKey: string ; //不能赋初始值
    @observable
    barVisible: boolean = false;
    @observable
    barStyle: string = defaultBarStyle;

    @action
    changeInitKey = (key ?: string = 'home'): void => {
        this.initKey = key;
    };

    @action
    initPage = (data ?: AppInitDefinition = {}): void => {
        let {key, statusBar} = data;
        this.changeInitKey(key);
        this.setStatusBar(statusBar);
    };

    @action
    setStatusBar = (statusBar ?: StatusBarDefinition = {}): void=>{
        let {visible = true, barStyle = defaultBarStyle} = statusBar;
        this.barVisible = visible;
        this.barStyle = barStyle;
    }
}

export default new AppStore();