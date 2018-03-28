import React from 'react';
import {Keyboard} from 'react-native';
import RootSiblings from '../../elements/rootsiblings';
import SelectNormalContainer from './SelectNormalContainer';

export default class select {
    static singleSelect = null;

    static show = (message, options = {}) => {
        Keyboard.dismiss();
        this.singleSelect && this.singleSelect.destroy();
        this.singleSelect = new RootSiblings(<SelectNormalContainer
            {...options}
            visible={true}
        >
            {message}
        </SelectNormalContainer>);
    };

    static hide = () => {
        let select = this.singleSelect;
        if (select && select instanceof RootSiblings) {
            select.destroy();
            this.singleSelect = null;
        }
    };
}
