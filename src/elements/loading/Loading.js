import React from 'react';
import {ActivityIndicator, Keyboard, StyleSheet, View, Text} from 'react-native';
import RootSiblings from '../../elements/rootsiblings';
import LoadingContainer, {durations, positions} from './LoadingContainer';


const HIDE_TIME = 1000;//隐藏延迟时间(s)
export default class Loading extends React.PureComponent {

    static singleLoading = null;
    static _showTime = 0;
    static _timeout = null;

    static show = (message, options = {position: positions.CENTER, duration: durations.NONE}) => {
        Keyboard.dismiss();
        this.singleLoading && Loading._hide();
        this._showTime = Date.now();
        return this.singleLoading = new RootSiblings(<LoadingContainer
            {...options}
            visible={true}
        >
            {message}
        </LoadingContainer>);
    };

    static hide = () => {
        let that = this;
        let dt = Date.now() - that._showTime;
        if(dt < HIDE_TIME) {
            that._timeout = setTimeout(Loading._hide, HIDE_TIME - dt);
        } else {
            Loading._hide();
        }
    };

    static _hide = () => {
        let that = this;
        let loading = that.singleLoading;
        clearTimeout(that._timeout);
        if (loading && loading instanceof RootSiblings) {
            that.singleLoading = null;
            loading.destroy();
        }
    };

    static isLoading = () => !!this.singleLoading;

    render (){
        let {
            visible, style = {}, children, textColor,
            containerStyle = {}
        } = this.props;
        if( !visible) return null;

        return (
            <View style={[styles.loading, style]}>
                <View style={[styles.container, containerStyle]}>
                    <ActivityIndicator animating={true} size={'large'} color="#e9e9e9"/>
                    <Text style={[
                        styles.textStyle,
                        textColor && {color: textColor}
                    ]}>
                        {children}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0, right: 0, top: 0, bottom: 0,
    },

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90, height: 80,
        borderRadius: 5,
        marginBottom: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },

    textStyle: {
        paddingTop: 5,
        fontSize: 12,
        color: '#fff',
        textAlign: 'center'
    },
});