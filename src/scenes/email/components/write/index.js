/**
 * 写邮件
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 17:12
 */
import React from 'react';
import {
    StyleSheet, View, TouchableOpacity, ScrollView,
    KeyboardAvoidingView, InteractionManager
} from 'react-native';
import {RichTextToolbar} from 'react-native-zss-rich-text-editor';
import {observer} from 'mobx-react/native';
import {getIOSSpacer} from '../../../../elements/keyboard';
import Editor from './Editor';
import Contact from './Contact';
import writeStore, {separators, RichActions} from '../../store/WriteStore';
import drawerStore from '../../store/DrawerStore';
import {mainColors, mainStyles, constant} from '../../../../styles/main.css';
import {Text} from '../../../../components/ui';
import styles from '../../styles/write.css';

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
            toAddress: (that.props.to || '').split(separators),
            subject: that.props.subject
        };
        InteractionManager.runAfterInteractions(()=> {
            that.store.initEdit(form, that.props.type);
        });
    }

    componentWillUnmount() {
        this.store.dispose();
    }

    render() {
        let store = this.store;
        return (
            <View style={[mainStyles.container, styles.container]}>
                <Contact store={store} currentMail={drawerStore.currentMail}/>
                <Editor store={store}/>

                <RichTextToolbar
                    actions={RichActions}
                    style={styles.richBar}
                    onPressAddImage={store.onAddImage}
                    selectedIconTint={mainColors.primary1}
                    selectedButtonStyle={{backgroundColor: "transparent"}}
                    getEditor={() => store.richText}
                />
                {getIOSSpacer()}
            </View>
        );
    }
};

export function NavRight (state){
    return (
        <TouchableOpacity style={styles.navView} onPress={writeStore.onSend}>
            <Text color='#fff' fontSize={constant.headerFontSize}>发送</Text>
        </TouchableOpacity>
    )
}