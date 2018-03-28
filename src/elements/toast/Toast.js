import React from 'react';
import RootSiblings from '../../elements/rootsiblings';
import ToastContainer, {durations, positions} from './ToastContainer';

export default class Toast {
    static positions = positions;
    static durations = durations;

    static singleToast = null;

    static show = (message, options = {}) => {
        this.singleToast && this.singleToast.destroy();
        options = {position: positions.BOTTOM, duration: durations.SHORT, ...options};
        return this.singleToast = new RootSiblings(<ToastContainer
            {...options}
            visible={true}
        >
            {message}
        </ToastContainer>);
    };

    static hide = toast => {
        toast = toast || this.singleToast;
        if (toast && toast instanceof RootSiblings) {
            this.singleToast = null;
            toast.destroy();
        }
    };
}