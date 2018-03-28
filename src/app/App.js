/**
 * 开始层
 * @flow
 * @author tangzehua
 * @since 2017-05-14 02:10
 */
import React from "react";
import {View, StyleSheet, StatusBar,Platform, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {autorunAsync} from 'mobx';
import {observer} from 'mobx-react/native';
import NativeSplash from './../extension/native/Splash';
import IndexRouter from "./../router";
import appStore from './AppStore';
import {mainColors, constant} from './../styles/main.css';
import xt from '../extension';

const {height, scale} = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F4F5F7',
        // paddingBottom: xt.isIphoneX()? 40: 0,
        paddingBottom: 0,
    },

    statusBar: {
        zIndex: 9999,
        top: 0, left: 0, right: 0,
        position: 'absolute',
        height: constant.statusHeight,
        backgroundColor: 'rgba(0,0,0, 0.25)',
    }
});

@observer
export class App extends React.Component {

    componentDidMount() {
        xt.data.init(()=>{
            if( !xt.data.user.id){
                this.props.store.initPage({
                    key: 'login',
                    statusBar: {
                        visible: false,
                        barStyle: 'dark-content',
                    }
                });
            } else {
                this.props.store.initPage({
                    statusBar: {
                        visible: false
                    }
                });
            }
            NativeSplash.hide();
        });
    }

    render () {
        let { store } = this.props;
        let color = 'transparent', barStyle = store.barStyle;
        if(store.barStyle === 'dark-content' && Platform.OS === 'android'){
            color = '#000';
            barStyle = 'light-content';
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={color} translucent={true} barStyle={barStyle}/>
                {store.initKey && <IndexRouter initKey={store.initKey}/>}
                {/*{ !xt.isIphoneX() && store.barVisible? <View style={styles.statusBar}/>: null}*/}
            </View>
        );
    }
}

export default ()=> <App store={appStore}/>
