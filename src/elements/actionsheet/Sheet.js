/* @flow */
import React from 'react';
import {Keyboard} from 'react-native';
import RootSiblings from '../../elements/rootsiblings';
import SheetContainer from './SheetContainer';
import SelectContainer from '../actionsheet/SelectContainer';

export default class Dialog {
    static singleSheet = null;

    static show = (message, options = {}) => {
        Keyboard.dismiss();
        this.singleSheet && this.singleSheet.destroy();
        this.singleSheet = new RootSiblings(<SheetContainer
            {...options}
            visible={true}
        >
            {message}
        </SheetContainer>);
    };

    static select = (section: Array<Object>, options = {}) => {
        Keyboard.dismiss();
        this.singleSheet && this.singleSheet.destroy();
        this.singleSheet = new RootSiblings(<SelectContainer
            {...options}
            visible={true}
        >
            {section}
        </SelectContainer>);
    };

    static hide = () => {
        let dialog = this.singleDialog;
        if (dialog && dialog instanceof RootSiblings) {
            dialog.destroy();
            this.singleSheet = null;
        }
    };

    static isDialog = () => Dialog.singleSheet !== null;
}
