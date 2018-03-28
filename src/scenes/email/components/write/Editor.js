/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-31 11:50
 */
import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import {ReadOnlyWebView} from '../../../../components/webview';
import styles from '../../styles/write.css';
import {Text} from '../../../../components/ui';
import {mainColors, mainStyles} from '../../../../styles/main.css';


const customCSS = `body{font-size:0.95em;padding-top: 10px;padding-bottom: 10px;}
#zss_editor_content {padding-left: 0;padding-right: 0;}`;

export default observer(({store}) => (
    <View style={styles.editorContainer}>
        <RichTextEditor
            hiddenTitle
            customCSS={customCSS}
            ref={store.setRichText}
            style={styles.richText}
            contentPlaceholder={'此处输入邮件正文'}
            initialContentHTML={`</br></br>${store.oneData.signContent || ''}</br>${store.oneData.originalContent || ''}`}
        />
        {
            // store.oneData.originalContent?
            //     <View style={styles.original}>
            //         <View style={styles.originalControl}>
            //             <View style={styles.originalLine}/>
            //             <Text c2 style={styles.originalText} fontSize={10}>原始内容</Text>
            //             <View style={styles.originalLine}/>
            //         </View>
            //         <ReadOnlyWebView source={{html: store.oneData.originalContent}} />
            //     </View> :null
        }
    </View>
));