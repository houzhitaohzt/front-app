/**
 *
 * @flow
 */
import {Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import xt, {Api} from '../../../extension';
import {ApiForm} from './../../../extension/decorate';

class WelcomeStore {

    avatar = [
        require('../../../assets/avatar/1.jpg'),
        require('../../../assets/avatar/2.png'),
        require('../../../assets/avatar/3.jpg'),
        require('../../../assets/avatar/4.jpg')
    ];

    carousel = [
        {source: require('../../../assets/wk/14.jpg')},
        {source: require('../../../assets/wk/11.jpg')},
        {source: require('../../../assets/wk/12.jpg')},
        {source: require('../../../assets/wk/13.jpg')},
        {source: require('../../../assets/wk/15.jpg')}

    ];

    @observable
    avatarIndex = 0;

    normalSelectData = [
        {label: "β-丙氨酸", id: 1},
        {label: "双乙醚咕咕黄原胶", id: 2},
        {label: "琥珀酸单甘油酯", id: 3},
        {label: "平台硫代二丙酸", id: 4},
        {label: "N -乙酰氨基葡萄糖", id: 5},
        {label: "单，双甘油脂肪酸酯", id: 6},
        {label: "辛烯基琥珀酸淀粉钠", id: 7}
    ];
    @observable
    normalSelectValue = null;
    @observable
    listSelectValue = [];

    templateArray: Array = [
        {title: 'Api 写法一(同步)', key: 'onApiOne'},
        {title: 'Api 写法二(异步)', key: 'onApiTwo'},
        {title: 'Api 写法三(注解)', key: 'onApiThree'},
        {title: 'Toast', key: 'onToast'},
        {title: 'Toast Error', key: 'onToastError'},
        {title: 'Loading', key: 'onLoading'},
        {title: 'Dialog Confirm', key: 'onConfirm'},
        {title: 'Dialog Tip', key: 'onDialogTip'},
        {title: 'Dialog select', key: 'onDialogSelect'},
    ];

    constructor (){
        this.normalSelectValue = this.normalSelectData[2];
    }

    onTitleClick = (): void => {
        console.log("Welcome to React Native!");
    };

    onTextClick = (): void => {
        // Actions.push(Platform.OS === 'android' ? 'subAndroid': 'subIOS');
    };

    onToast = (): void => {
        xt.ui.showToast("我是Toast哦. \n亲,我2秒就会消失的!");
    };

    onToastError = (): void => {
        xt.ui.showEToast("我是Toast Error哦. \n亲,我3.5秒就会消失的!");
    };

    onLoading = (): void =>{
        // duration = 定时消失参数
        xt.ui.showLoading("定时2秒...", {duration: 2000});
        // 默认参数=加载中...
        // xt.ui.showLoading(); //显示
        // xt.ui.hideLoading(); //隐藏
    };

    onConfirm = (): void =>{
        xt.ui.confirm("T-我是选择操作框..", {
            // doneTitle: "必须点我", // default = 确定
            // cancelTitle: "点我试试?",// default = 取消
            done: () => {
                xt.ui.showToast("亲, 你点击了确认哦!");
            },
            cancel: () => {
                xt.ui.showToast("亲, 取消后就不见了哦!");
            }
        });
    };

    onDialogSelect =(): void => {
        //第二个参数为选填
        xt.ui.showSheetSelect([
            {
                label: "回复", onPress: ()=>{
                    xt.ui.showToast("亲, 选择回复了哦!");
                }
            },
            {
                label: "转发", onPress: ()=>{
                    xt.ui.showToast("亲, 选择转发了哦!")
                }
            },
            {
                label: "回家吃饭", onPress: ()=>{
                xt.ui.showToast("亲, 回家吃饭!")
            }
            },
        ], {
            // cancelTitle: "点我试试?",// default = 取消
            cancel: () => {
                xt.ui.showToast("亲, 取消后就不见了哦!");
            }
        });
    };

    onDialogTip = (): void => {
        xt.ui.showTip("你必须请我吃饭, 你没得选择哦!");
    };

    onNormalSelect = (): void => {
        let that = this;
        xt.ui.showSelectNormal("请选择产品", {
            value: this.normalSelectValue,
            labelKey: 'label',
            sections: this.normalSelectData,
            done: action((value) => {
                that.normalSelectValue = value;
                // xt.ui.showToast(JSON.stringify(value));
            })
        })
    };

    onListSelect = (): void => {
        let that = this;
        Actions.push("listSelect", {
            title: '选择联系人',
            subKey: 'localName',
            selectArgs: {
                single: true,
                data: that.listSelectValue,
                done: action(data=> that.listSelectValue = data)
            },
            pagingArgs: {
                host: Api.DS,
                uri: '/material/app/getPage'
            }
        });
    };

    // pi 写法一
    onApiOne = async ()=>{
        xt.ui.showLoading("请求登录...");
        try {
            //data 即使返回值
            let data = await Api.form(Api.ES, '/fc/appLogin', {
                name: '2016',
                language: 'zh_CN',
                password: 'test123'
            });
            console.log("请求成功!");
        } catch (e){
            xt.ui.showEToast(e);
        } finally {
            xt.ui.hideLoading();
        }
    };

    // Api 写法二
    onApiTwo = ()=>{
        xt.ui.showLoading("请求登录...");
        Api.form(Api.ES, "/fc/appLogin", {
            name: '2016',
            language: 'zh_CN',
            password: 'test123'
        }).then((value) => {
            // value 即使返回值
            console.log("请求成功!");
            xt.ui.hideLoading();
        }).catch((error)=>{
            xt.ui.hideLoading();
            xt.ui.showEToast(error);
        });
    };

    // Api 写法三(注解)
    onApiThree = () => {
        xt.ui.showLoading();
        this.onApiRequest({
            name: '2016',
            language: 'zh_CN',
            password: 'test123'
        });
    };

    // Api 写法三(注解)
    @ApiForm( Api.ES, "/fc/appLogin")
    onApiRequest (error, data){
        if( error ){
            xt.ui.showEToast(error);
        } else {
            // data 即使返回值
            console.log("请求成功!");
        }
        xt.ui.hideLoading();
    }
}

export default new WelcomeStore();


