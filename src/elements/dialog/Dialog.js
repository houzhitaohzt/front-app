/* @flow */
import React from 'react';
import {Keyboard} from 'react-native';
import RootSiblings from '../../elements/rootsiblings';
import DialogContainer, {durations, positions} from './DialogContainer';

export default class Dialog {
    static singleDialog = null;

    static show = (message, options = {}) => {
        Keyboard.dismiss();
        this.singleDialog && this.singleDialog.destroy();
        options = {position: positions.CENTER, duration: durations.NONE, ...options};
        this.singleDialog = new RootSiblings(<DialogContainer
            {...options}
            visible={true}
        >
            {message}
        </DialogContainer>);
    };

    static hide = () => {
        let dialog = this.singleDialog;
        if (dialog && dialog instanceof RootSiblings) {
            dialog.destroy();
            this.singleDialog = null;
        }
    };

    static isDialog = () => Dialog.singleDialog !== null;
}
