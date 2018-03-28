/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    TouchableOpacity, StyleSheet, TouchableHighlight, KeyboardAvoidingView,
    Text, View, ScrollView, Dimensions, Platform, Image,
} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {mainColors} from './../../../styles/main.css';
import {observer} from 'mobx-react/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as mobx from 'mobx';
import Avatar from './../../../elements/avatar/Avatar';
import DeviceInfo from "../../../extension/native/DeviceInfo";
import store from './../store/WelcomeStore';
import styles from './../styles/welcome.css';

import WelcomeText from './WelcomeText';
import Demo from './Demo';
import xt from './../../../extension';
import {getIOSSpacer} from "../../../elements/keyboard";

const {width: screenWidth} = Dimensions.get('window');

@observer
class Welcome extends React.Component {

    renderTemplate = (item, index) => {
        let {store} = this.props;
        let {title} = item;
        let ix = index + 1, count = store.templateArray.length;
        let borderBottom = ix > (Math.floor(count / 3) * 3) ? 0 : StyleSheet.hairlineWidth;
        let borderRight = ix % 3 === 0 ? 0 : StyleSheet.hairlineWidth;
        return (
            <TouchableHighlight
                delayPressIn={0}
                delayPressOut={0}
                underlayColor={mainColors.touchBack}
                key={title}
                onPress={() => store[item.key]()}
            >
                <View key={title}
                      style={[styles.templateMenu, {borderBottomWidth: borderBottom, borderRightWidth: borderRight}]}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            </TouchableHighlight>
        )
    };

    _renderCarouselItem({item, index}) {
        return (
            <View style={styles.slide1}>
                <Image resizeMode="cover" source={item.source} style={{width: screenWidth, height: 220}}/>
            </View>
        );
    }

    render() {
        let {
            getAvatar,
            onTitleClick,
            onTextClick,
            swiper,
            carousel
        } = this.props.store;
        return (
            <View style={{flex: 1}}>
                <KeyboardAwareScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps='handled'>
                    <Carousel
                        containerCustomStyle={{ backgroundColor: '#000'}} autoplay
                        sliderWidth={screenWidth} sliderHeight={220} itemHeight={220} autoplayDelay={3000}
                        itemWidth={screenWidth} renderItem={this._renderCarouselItem} inactiveSlideScale={1}
                        data={carousel}
                    />
                    {/*<Image resizeMode="cover" source={require('../../../assets/wk/14.jpg')} style={{width: screenWidth, height: 220}}/>*/}
                    <View style={styles.container}>
                        <TouchableOpacity onPress={onTitleClick}>
                            <Text style={styles.welcome}>
                                Welcome to React Native!
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.instructions}>
                            To get started, edit welcome.js
                        </Text>
                        <WelcomeText onClick={onTextClick}/>
                    </View>
                    <View style={styles.template}>
                        {store.templateArray.map(this.renderTemplate)}
                    </View>
                    <Demo store={store}/>
                </KeyboardAwareScrollView>
                <View style={styles.bottomVersion}>
                    <Text>{Platform.OS + "=>" + Platform.Version}: {DeviceInfo.getVersion()}
                        RN: {xt.data.config.version}</Text>
                </View>
            </View>
        );
    }
}

export default props => <Welcome store={store}/>
