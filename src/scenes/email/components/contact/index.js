/**
 * 写邮件
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 17:12
 */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RichTextToolbar} from 'react-native-zss-rich-text-editor';
import {observer} from 'mobx-react/native';
import {getIOSSpacer} from '../../../../elements/keyboard';
import writeStore from '../../store/WriteStore';
import contactStore, { ContactConst} from '../../store/ContactStore';
import {constant, mainColors, mainStyles} from '../../../../styles/main.css';
import {Text} from '../../../../components/ui';
import styles from '../../styles/contact.css';

@observer
export default class Write extends React.Component {

    constructor(props){
        super(props);
        this.store = writeStore;

    }

    componentWillMount() {
        let that = this;
        let form = {
            id: that.props.id,
            sendAddress: drawerStore.currentMail,
            toAddress: that.props.to,
            subject: that.props.subject
        };
        that.store.initEdit(form, that.props.type);
    }

    componentWillUnmount() {
        this.store.dispose();
    }

    render() {
        return (
            <View style={[mainStyles.container, styles.container]}>
                <RichTextToolbar
                    style={styles.richBar}
                    onPressAddImage={this.store.onAddImage}
                    selectedIconTint={mainColors.primary1}
                    selectedButtonStyle={{backgroundColor: "transparent"}}
                    getEditor={() => this.store.richText}
                />
                {getIOSSpacer()}
            </View>
        );
    }
};


export function Inside (item){

    return (
        <View style={styles.subView}>
            <Text numberOfLines={1}>{item.staffName}</Text>
            <Text c2 numberOfLines={1}>{item.email}</Text>
            <View style={styles.insideCp}>
                    <Text c2 numberOfLines={1}>{item.companyName}</Text>
                    <Text c2 numberOfLines={1}>{item.departmentName}</Text>
            </View>
        </View>
    )
}

export {
    ContactConst as Const
};