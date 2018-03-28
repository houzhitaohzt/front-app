/* @flow */
import React from 'react';
import {Dimensions} from 'react-native';

import Toast from '../../elements/toast';
import Loading from '../../elements/loading';
import Dialog from '../../elements/dialog';
import ActionSheet from '../../elements/actionsheet';
import SelectNormal from '../../components/select';

export default class ui {

    static Toast = Toast;
    static Loading = Loading;
    static Dialog = Dialog;

    static width = Dimensions.get('window').width;
    static height = Dimensions.get('window').height;

    //显示正常的toast提示
    static showToast (message: string, options: ?Object = {}): void {
        Toast.show(message, options);
    }

    //显示错误的toast提示
    static showEToast (message: string, options: ?Object = {}): void {
        Toast.show(message, {duration: Toast.durations.LONG, backgroundColor: 'rgba(153, 0, 0, 0.7)', ...options});
    }

    // 显示loading 框
    static showLoading (title: string = "加载中...", options: ?Object): void {
        Loading.show(title, options)
    }

    //隐藏loading
    static hideLoading (): void {
        Loading.hide();
    }

    //判断是否显示了loading
    static isLoading (): boolean {
        return Loading.isLoading();
    }

    // 显示confirm 确认框
    static confirm (content, options: ?Object = {}): void {
        Dialog.show(content, {
            doneTitle: '确定',
            cancelTitle: "取消",
            ...options
        })
    }

    //显示 tip 确认框
    static showTip (content, options: ?Object): void{
        Dialog.show(content, {
            doneTitle: '确定',
            ...options
        })
    }

    //隐藏confirm 或者 tip 对话框
    static hideDialog (): void {
        Dialog.hide();
    }

    //动作面板选择器-一行试
    static showSheetSelect (section: Array<Object>, options: ?Object = {}): void{
        ActionSheet.select(section, {
            cancelTitle: "取消",
            ...options
        });
    }

    //显示动作面板
    static showActionsSheet (section: Array<Object>, options: ?Object = {}): void{
        console.warn('还未实现');
        ActionSheet.show(section, {
            cancelTitle: "取消",
            ...options
        });
    }

    //隐藏动作面板选择器
    static hideActionsSheet (ele: ?any): void {
        ActionSheet.hide();
    }

    //显示一个普通的选择器组件
    static showSelectNormal (title: string, options: Object): void{
        SelectNormal.show(title, options);
    }

}