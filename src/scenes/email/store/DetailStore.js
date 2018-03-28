/**
 * 邮件详情
 * @flow
 * @author tangzehua
 * @sine 2017-08-23 16:42
 */
import {AsyncStorage, NativeModules} from 'react-native';
import {action, computed, observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import xt, {Api} from '../../../extension';
import {TouchDelay} from '../../../extension/decorate';
import RNFS from "react-native-fs";
import DocViewer from 'react-native-doc-viewer';

const annexPath = (xt.isIOS() ? RNFS.DocumentDirectoryPath : RNFS.ExternalStorageDirectoryPath) + '/noohle/annex/';

export class DetailStore {

    mailItem: Object = {};
    @observable
    detailData: Object; //邮件详情
    @observable
    titleDetail: boolean = false;//标题详情
    @observable
    moreLess: boolean = false; //文件显示多少
    @observable
    appurtenance: Array = []; //存储附件的数组

    @computed
    get sections() {
        return this.messageList.slice();
    }

    @action
    initData(item) {
        let that = this;
        if (item !== that.mailItem) {
            that.mailItem = item;
            that.detailData = null;
            this.titleDetail = false;
            this.moreLess = false;
        }
    }

    @action
    onTitleDetail = () => {
        this.titleDetail = !this.titleDetail;
    };

    @action
    onMoreLess = () => {
        this.moreLess = !this.moreLess;
    };

    //查询邮件详情
    async fetchDetail(item: Object = {}): void {
        if (this.detailData) return;
        try {
            let {data} = await Api.get(Api.MAIL, '/box/getOne', {
                collectionName: item.collectName,
                isOwn: true,
                mailId: item.id
            });
            this.setAppurtenance(data);
            // this.setDetailData(data);
        } catch (e) {
            xt.ui.showEToast(e);
        }
    }

    onWebLoad = () => {
        console.log("加载完成...")
    };

    /*
    * 附件 对附件做一个循环,判断是否已经下载
    * */
    async setAppurtenance(data) {
        let tempArr = (data && (data.attachs || data.newAttachs) || []).slice();
        for (let v of tempArr)
            await RNFS.exists(this.getFilePath(v.fileName)).then((data) => v.isExist = !!data);

        return this.setDetailData(data, tempArr);
    }

    @action
    setDetailData(data, tempArr) {
        data.attachs = tempArr;
        this.appurtenance = tempArr;
        this.detailData = data;
    }

    @TouchDelay
    onReplyOrForward() {
        xt.ui.showSheetSelect([
            {label: "回复", onPress: this.onReply},
            {label: "转发", onPress: this.onForward},
        ]);
    }

    /**
     * 回复
     */
    @TouchDelay
    onReply = () => {
        let detail = this.detailData;
        Actions.push('mailWrite', {
            // subject: `Re:${detail.subject}`,
            type: 'reply',
            id: detail.id,
            to: detail.sendMail
        });
    };

    /**
     * 转发
     */
    @TouchDelay
    onForward = () => {
        let detail = this.detailData;
        Actions.push('mailWrite', {
            // subject: `Fw:${detail.subject}`,
            type: 'forward',
            id: detail.id
        });
    };

    @TouchDelay
    onDelete() {
        xt.ui.showSheetSelect([
            {label: "彻底删除", onPress: this._onCDDelete},
            {label: "删除", onPress: this._onDelete},
        ]);
    }

    _onCDDelete = () => {
        xt.ui.confirm("彻底删除后邮件将无法恢复, 您确定要删除吗?", {
            done: () => {
                xt.ui.showToast("后续版本开放! 敬请期待!");
            }
        });
    };

    getFilePath = (name ?: string = '')=> {
        return `${annexPath}${this.mailItem.id}/${name}`
    };

    /*
    * 文件预览
    * */
    onFilePreview = (file) => {
        let filepath = this.getFilePath(file.fileName);
        DocViewer.openDoc([{
            url: xt.isAndroid()? "file://" + filepath : filepath,
            fileName: "sample",
        }], (error, url) => {
            error && xt.ui.showToast("文件打开失败!");
        })
    };

    /*
     *文件下载
     */
    onFileDown = (e) => {
        let that = this;
        let file = that.getFilePath(e.fileName);
        RNFS.exists(file).then((data) => {//返回data 为true 表明是存在 文件夹.,data为false, 表明不存在该文件夹
            let url = Api.getURL(Api.MAIL_SERVER, "/file/down");
            if (data) {
                that.fileDown(url, e);
            } else {//data 为 false, 表明没有文件夹 新建一个文件夹
                RNFS.mkdir(that.getFilePath(), {
                    NSURLIsExcludedFromBackupKey: true
                }).then(() => {
                    that.fileDown(url, e);
                }).catch(() => {
                    xt.ui.showToast("下载失败!!!");
                })
            }
        }).catch((data) => {
            console.log("error", data)
        })
    };

    //下载文件的保存
    fileDown = async (fromUrl, params) => {
        let that =this;
        let downUrl = `${fromUrl}?filePath=${encodeURIComponent(params.filePath || params.fullPath)}&fileName=${encodeURIComponent(params.fileName)}`;
        RNFS.downloadFile({
            fromUrl: downUrl,
            toFile: that.getFilePath(params.fileName),
            headers: { ... await Api.getCookieHeader(fromUrl) },
            background: true,
            begin: (res) => {
                // console.log("length:" + res.contentLength)
            },
            progress: (res) => {
                // console.log(res.bytesWritten / res.contentLength);
            }
        }).promise.then(({statusCode}) => {
            if (statusCode === 200) {
                xt.ui.showToast('下载成功');
                this.onRefresh(params);//刷新下载页面
            } else {
                xt.ui.showToast("下载失败!");
            }
        }).catch((error) => {
            xt.ui.showToast("下载失败,点击重试!!");
            console.log(error)
        })
    };

    /*
    * 下载成功后,刷新页面
    * */
    @action
    onRefresh = currentObj => {
        currentObj.isExist = true;
    };

    _onDelete = () => {
        xt.ui.showToast("后续版本开放! 敬请期待!");
    };

    @TouchDelay
    onMore() {
        xt.ui.showToast("后续版本开放! 敬请期待!");
    }

    @TouchDelay
    onNext() {
        xt.ui.showToast("后续版本开放! 敬请期待!");
    }

    @TouchDelay
    onLast() {
        xt.ui.showToast("后续版本开放! 敬请期待!");
    }
}

export default new DetailStore();
