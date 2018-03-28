/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-24 11:42
 */
import React from 'react';
import {View, WebView} from 'react-native';
import {observer} from 'mobx-react/native';
import {ReadOnlyWebView} from '../../../../components/webview';
import styles from '../../styles/detail.css';
import Loading from '../.././../../elements/loading';

const stopLoading = (webview, navState) => {
    if (webview && xt.regex.isURL(navState.url)) {
        webview.stopLoading();
    }
};

/**
 * 邮件详情 html: store.detailData && store.detailData.context
 */
export default observer(({store}) => (
    <View style={styles.webView}>
        {
            store.detailData ?
                <ReadOnlyWebView source={{html: store.detailData.context}} autoSize={false}/> :
                <Loading visible={true} children='加载中...'/>
        }
    </View>
))