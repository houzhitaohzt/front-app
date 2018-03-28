/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-06 15:14
 */
import React from 'react';
import {UIManager, WebView, StyleSheet} from 'react-native';

const CONSTANT = {
    OFFSET_HEIGHT: 'OFFSET_HEIGHT',
};
const getHeightScript = `
window.postMessage(JSON.stringify({type: '${CONSTANT.OFFSET_HEIGHT}', data: document.body.offsetHeight}))
`;
const SCALE_HTML = `
<!DOCTYPE html>\n
<html><head>
    <title></title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes, target-densitydpi=high-dpi"/>
    <style type="text/css">
      html, body { margin: 0; padding: 0;  overflow-y: hidden !important; font: 80% arial, sans-serif;}
      img{   max-width: 100%;  }
      table {  width: 100% !important; }
      table td {width: inherit;  }
      table span { font-size: 12px !important; }
    </style>
  </head>
  <body style="margin:5px 5px 0 0;">{context}</body>
</html>
`;

const getHtml = (html)=>{
    let $data = {context: html};
    return  SCALE_HTML.replace(new RegExp('({[A-Za-z_]+[A-Za-z0-9_-]*})','g'), function($1) {
        return $data[$1.replace(/[{}]+/g, '')]
    });
};

type Props = {
    source: ({html: string} | {url: string}),
    autoSize ?: boolean
}

export default class ReadOnlyWebView extends React.Component {
    props: Props;

    constructor (props){
        super(props);
        this.isLoad = false;
        this.state = {
            height: 0,
        }
    }

    shouldComponentUpdate(props, state) {
        return props.source.html !== this.props.source.html
            || props.source.url !== this.props.source.url
            || state.height !== this.state.height;
    }

    onNavigationStateChange = (navState)=>{
        let {source} = this.props;
        if(this.webView && (navState.title !== '' || this.isLoad) &&
            navState.url !== source.url && source.html){
            console.log("stop web view loading!");
            this.webView.stopLoading();
        }
    };

    onShouldStartLoadWithRequest = (a)=> {
        return a.url === 'about:blank';
    };

    onMessage = (event) => {
        let msg = JSON.parse(event.nativeEvent.data);
        switch (msg.type){
            case CONSTANT.OFFSET_HEIGHT:
                this.setWebHeight(msg.data);
                break;
            default:
                break;
        }
    };

    setWebHeight = (height)=>{
        // console.log(height);
        this.setState({height});
        this.webView.injectJavaScript(`document.getElementsByTagName('body')[0].style.height=${height}px`);
    };

    onContentSizeChange = (event)=>{
        // console.log(event.nativeEvent, 'change');
        // this.setState({height: event.nativeEvent.height});
    };

    onLoad = ()=>{
        this.isLoad = true;
        this.props.autoSize && this.webView.injectJavaScript(getHeightScript);
    };

    render() {
        let source = Object.assign({}, this.props.source);
        if(source.html) source.html = getHtml(source.html);
        let {style, ...rest} = this.props;
        let {height} = this.state;
        // console.log(height);
        return (
            <WebView
                ref={rf => this.webView = rf}
                allowUniversalAccessFromFileURLs={false}
                thirdPartyCookiesEnabled={false}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                onNavigationStateChange={this.onNavigationStateChange}
                javaScriptEnabled={true} scalesPageToFit={false}
                automaticallyAdjustContentInsets={true}
                domStorageEnabled={false}
                onMessage={this.onMessage}
                onContentSizeChange={this.onContentSizeChange}
                mixedContentMode='always'
                startInLoadingState={false}
                bounces={false}
                style={[height && {height}, style, styles.web]}
                dataDetectorTypes={'none'}
                {...rest}
                source={source}
                onLoad={this.onLoad}
            />
        );
    }
}

const styles = StyleSheet.create({
    web: {
        backgroundColor: 'transparent'
    }
});