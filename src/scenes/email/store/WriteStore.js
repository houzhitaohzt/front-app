/**
 * 写邮件
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 17:17
 */
import {Platform, Keyboard} from 'react-native';
import {actions} from 'react-native-zss-rich-text-editor';
import {action, computed, observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import xt, {Api} from '../../../extension';
import {TouchDelay, ApiGet} from '../../../extension/decorate';

export const separators = ";";

type FormDataDefinition = {
    id: string,
    sendAddress: string, //发件人
    toAddress: Array<string>,
    ccAddress: Array<string>, // 抄送
    bccAddress: Array<string>, // 密送
    subject: string, // 主题
    originalContent: string, //原始邮件内容
}

export const  RichActions = [
    actions.insertImage,
    actions.setBold,
    actions.setItalic,
    actions.insertBulletsList,
    actions.insertOrderedList,
    // actions.insertLink
];

export class WriteStore {
    @observable
    forceUpdate: number = 0;
    //表单对象
    formData: FormDataDefinition = {};
    oneData: Object = {};

    richText;//富文本
    //富文本工具条是否显示
    @observable
    richBarVisible: boolean = false;
    //更多输入
    @observable
    moreInputVisible: boolean = false;
    moreInputFocus: boolean = false;

    //所有联系人Map
    contactMap: (Map<string, Object>) = new Map();

    onAddImage = () => {
        // this.richText.blurContentEditor();
        xt.ui.showSheetSelect([
            {label: "选择图片", onPress: this.openPicker},
            {label: "拍摄照片", onPress: this.openCamera}
        ]);
    };

    insertImage(image) {
        // console.log(image.size / 1000, image.width, image.height, image.path);
        // xt.ui.showToast(image.size / 1000 + " - " + image.width + " -" + image.height);
        if (image.size < 1000 * 512) {
            this.richText.insertImage({
                src: `data:${image.mime};base64,${image.data}`
            });
            this.richText.blurContentEditor();
        } else {
            xt.ui.confirm("最大只支持512KB的图片, 是否进行图片裁剪?", {
                done: () => this.openCropper(image)
            });
        }
    }

    openCropper(cropperImage) {
        let width, height, wi = 800;
        if (width > height) {
            width = wi;
            height = (cropperImage.height / cropperImage.width) * wi;
        } else {
            height = wi;
            width = (cropperImage.width / cropperImage.height) * wi;
        }

        ImagePicker.openCropper({
            width, height,
            path: cropperImage.path,
            compressImageQuality: 0.3,
            includeBase64: true,
        }).then(image => {
            this.insertImage(image);
        }).catch(e => {
            if (e && e.code !== "E_PICKER_CANCELLED") {
                xt.ui.showEToast("裁剪图片出现未知错误");
            }
        });
    }

    openPicker = () => {
        ImagePicker.openPicker({
            includeBase64: true,
            maxFiles: 1,
            compressImageQuality: 0.3,
            mediaType: 'photo',
        }).then(image => {
            this.insertImage(image);
        }).catch(e => {
            if (e && e.code !== "E_PICKER_CANCELLED") {
                xt.ui.showEToast("选择图片出现未知错误");
            }
        });
    };

    openCamera = () => {
        ImagePicker.openCamera({
            // cropping: true,
            compressImageQuality: 0.5,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            includeBase64: true,
            mediaType: 'photo',
        }).then(image => {
            this.insertImage(image);
        }).catch(e => {
            e.code !== 'E_PICKER_CANCELLED' && xt.ui.showEToast("选择图片出现未知错误");
        });
    };

    /**
     * 初始化写邮件
     */
    initEdit(formData: FormDataDefinition, type: string) {
        this.formData = formData;
        xt.ui.showLoading("初始化中...");
        this.fetchWriteOne({
            collectionName: formData.sendAddress,
            mailId: formData.id,
            type
        });
    }

    @ApiGet(Api.MAIL, '/write/getOne')
    fetchWriteOne(error, data) {
        xt.ui.hideLoading();
        if (!error) {
            this.setOneData(data.data);
        } else {
            xt.ui.showTip("初始化写邮件失败\n" + error, {
                done: () => Actions.pop()
            })
        }
    }

    @action
    setOneData(data) {
        let that = this;
        that.formData.toAddress = data.toAddress && data.toAddress.split(separators) || [];
        that.formData.subject = data.subject;
        that.oneData = data;
        that.forceUpdate ++ ;
        that.richText && that.richText.setContentHTML(`</br></br>${data.signContent || ''}</br>${data.originalContent || ''}`);
    }

    @action
    dispose(): void {
        let that = this;
        that.formData = {};
        that.oneData = {};
        that.contactMap.clear();

        that.richBarVisible = false;
        that.moreInputFocus = false;
        that.moreInputVisible = false;
        // ImagePicker.clean();
    }

    setRichText = (ref): void => {
        let that = this;
        that.richText = ref;
        if (that.richText) {
            that.richText.setContentFocusHandler(() => {
                that.setRichBarVisible(true);
            });
        }
    };

    @action
    setRichBarVisible(visible: boolean): void {
        this.richBarVisible = visible
    }

    @action
    setMoreInputVisible(visible: boolean): void {
        let that = this;
        if (visible !== false || (that.formData.ccAddress || []).length === 0 && (that.formData.bccAddress || []).length === 0) {
            that.moreInputVisible = visible;
        }
    }

    showMoreInput = (): void => {
        this.setMoreInputVisible(true);
    };

    moreFocus = (): void => {
        this.moreInputFocus = true;
    };

    moreBlur = (): void => {
        let that = this;
        that.moreInputFocus = false;
        setTimeout(() => {
            !that.moreInputFocus && that.setMoreInputVisible(false);
        }, 50);
    };

    //打开联系人选择界面
    @TouchDelay
    openContact = (title: string, mail: Array<string>, done: (data: Array<Object>) => void) => {
        let that = this, data = [], inputMail = [];
        (mail || []).forEach(showName => {
            let name = xt.regex.getMail(showName);
            if(that.contactMap.has(name)){
                data.push(that.contactMap.get(name));
            } else {
                inputMail.push(name);
            }
        });
        Actions.push("mailSelectContact", {
            title: '选择' + title,
            placeholder: '名称、邮箱',
            selectArgs: {
                data,
                done: data => {
                    let mail = [];
                    data.forEach(da => {
                        let name = da.email, showName = da.staffName || da.name;
                        if(name.indexOf("<") === -1 && name.charAt(name.length -1 ) !== '>'){
                            showName = `${showName}<${name}>`;
                        } else {
                            showName = name;
                        }
                        that.contactMap.set( xt.regex.getMail(showName), da);
                        mail.push(showName);
                    });
                    done(Array.from(new Set([...inputMail, ...mail])));
                }
            }
        });
    };

    //添加收件人
    onAddToAddress = () => {
        let that = this;
        that.openContact("收件人", that.formData.toAddress, action(data => {
            that.formData.toAddress = data;
            that.forceUpdate += 1;
        }));
    };

    //添加抄送
    onAddCcAddress = ()=> {
        let that = this;
        that.openContact("抄送人", that.formData.ccAddress, action(data => {
            that.formData.ccAddress = data;
            that.forceUpdate += 1;
            data.length && that.setMoreInputVisible(true);
        }));
    };

    //添加抄送
    onAddBccAddress = ()=> {
        let that = this;
        that.openContact("密送人", that.formData.bccAddress, action(data => {
            that.formData.bccAddress = data;
            that.forceUpdate += 1;
            data.length && that.setMoreInputVisible(true);
        }));
    };

    @TouchDelay
    onSend = (): void => {
        let that = this;
        let toAddress = that.formData.toAddress;
        console.log(Object.assign({}, that.formData));

        if (toAddress.length) {
            if (xt.isBlank(that.formData.subject)) {
                return xt.ui.showEToast("请填写主题");
            }

            that.sendMail();
        } else {
            xt.ui.showEToast("请填收件人信息");
        }
    };

    async sendMail() {
        let that = this;
        let html = await that.richText.getContentHtml();
        if (xt.isBlank(html)) xt.ui.showEToast("请填写邮件内容");

        xt.ui.showLoading('发送中...');
        try {
            let formData = that.formData;
            let param = {
                association: that.oneData.association,
                appContent: html,
                box: 'SEND',
                viewSingle: false,
                bccAddress: (formData.bccAddress || []).join(separators),
                ccAddress: (formData.ccAddress || []).join(separators),
                toAddress: (formData.toAddress || []).join(separators),
                sendAddress: formData.sendAddress,
                subject: formData.subject,
            };
            await Api.post(Api.MAIL, '/write/save', param);
            this.richText.blurContentEditor();
            xt.ui.showTip("发送成功", {
                done: () => {
                    Actions.pop();
                }
            });
        } catch (e) {
            xt.ui.showEToast(e);
        } finally {
            xt.ui.hideLoading();
        }
    }
}

export default new WriteStore();