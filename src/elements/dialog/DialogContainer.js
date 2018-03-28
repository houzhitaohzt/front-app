import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View, TouchableOpacity,
    Text, TouchableWithoutFeedback,
    Animated, BackHandler,
    Dimensions,
    Easing
} from 'react-native';
const LOADING_MAX_WIDTH = 0.8;
const LOADING_ANIMATION_DURATION = 150;
const DIMENSION = Dimensions.get('window');
const WINDOW_WIDTH = DIMENSION.width;

const positions = {
    TOP: 20,
    BOTTOM: -20,
    CENTER: 0
};

const durations = {
    NONE: 0,
    LONG: 5000,
    SHORT: 2500
};

let styles = StyleSheet.create({
    defaultStyle: {
        position: 'absolute',
        width: WINDOW_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerStyle: {
        // padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 15,
        flexDirection: 'column',
        width: 270,
        minHeight: 130,
        marginHorizontal: WINDOW_WIDTH * ((1 - LOADING_MAX_WIDTH) / 2)
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ddd',
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 10
    },
    textStyle: {
        fontSize: 17,
        textAlign: 'center',
        color: '#000033'
    },
    textView: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        marginVertical: 19,
        marginHorizontal: 16,
    },
    container: {
        height: 40,
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    btnTouch: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    btnTxt: {
        color: '#2095f2',
        fontSize: 17,
    },
    btnLine: {
        height: 40,
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#ddd',
    },
    overlay: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
});

export default class extends Component {
    static displayName = 'LoadingContainer';

    static propTypes = {
        ...View.propTypes,
        duration: PropTypes.number,
        visible: PropTypes.bool,
        position: PropTypes.number,
        animation: PropTypes.bool,
        shadow: PropTypes.bool,
        backgroundColor: PropTypes.string,
        shadowColor: PropTypes.string,
        textColor: PropTypes.string,
        delay: PropTypes.number,
        hideOnPress: PropTypes.bool,
        onHide: PropTypes.func,
        onHidden: PropTypes.func,
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        doneTitle: PropTypes.string,
        cancelTitle: PropTypes.string,
        done: PropTypes.func,
        cancel: PropTypes.func
    };

    static defaultProps = {
        visible: false,
        duration: durations.NONE,
        animation: true,
        shadow: true,
        position: positions.CENTER,
        delay: 0,
        hideOnPress: false,
        doneTitle: '确定',
    };

    constructor() {
        super(...arguments);
        this.state = {
            visible: this.props.visible,
            opacity: new Animated.Value(0)
        };
        this._isHide = false;
    }

    componentDidMount = () => {
        if (this.state.visible) {
            this._showTimeout = setTimeout(() => this._show(), this.props.delay);
        }
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.visible !== this.props.visible) {
            if (nextProps.visible) {
                clearTimeout(this._showTimeout);
                clearTimeout(this._hideTimeout);
                this._showTimeout = setTimeout(() => this._show(), this.props.delay);
            } else {
                this._hide();
            }

            this.setState({
                visible: nextProps.visible
            });
        }
    };

    componentWillUnmount = () => {
        this._hide();
    };

    shouldComponentUpdate = (nextProps, nextState) => {
        return this.state.visible !== nextState.visible;
    };

    onBackPress = () => {
        this.props.cancelTitle? this._cancel(): this._done();
        return true;
    };

    _animating = false;
    _root = null;
    _hideTimeout = null;
    _showTimeout = null;

    _show = () => {
        this._isHide = true;
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        clearTimeout(this._showTimeout);
        if (!this._animating) {
            clearTimeout(this._hideTimeout);
            this._animating = true;
            this._root && this._root.setNativeProps({
                pointerEvents: 'auto'
            });
            this.props.onShow && this.props.onShow(this.props.siblingManager);
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: this.props.animation ? LOADING_ANIMATION_DURATION : 0,
                easing: Easing.out(Easing.ease)
            }).start(({finished}) => {
                if (finished) {
                    this._animating = !finished;
                    this.props.onShown && this.props.onShown(this.props.siblingManager);
                    if (this.props.duration > 0) {
                        this._hideTimeout = setTimeout(() => this._hide(), this.props.duration);
                    }
                }
            });
        }
    };

    _hide = () => {
        if(!this._isHide || this._animating) return;
        this._isHide = false;
        clearTimeout(this._showTimeout);
        clearTimeout(this._hideTimeout);
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        // console.log(this._animating);
        if (!this._animating) {
            this._root && this._root.setNativeProps({
                pointerEvents: 'none'
            });
            this.props.onHide && this.props.onHide(this.props.siblingManager);
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: this.props.animation ? LOADING_ANIMATION_DURATION : 0,
                easing: Easing.in(Easing.ease)
            }).start(({finished}) => {
                if (finished) {
                    this.setState({visible: false});
                    this._animating = false;
                    this.props.onHidden && this.props.onHidden(this.props.siblingManager);
                }
            });
        }
    };

    _done = () => {
        if(!this._isHide) return;
        this._hide();
        this.props.done && this.props.done();
    };

    _cancel = () => {
        if(!this._isHide) return;
        this._hide();
        this.props.cancel && this.props.cancel();
    };

    render() {
        let {props} =  this;
        let offset = props.position;
        let position = offset ? {
            [offset < 0 ? 'bottom' : 'top']: Math.abs(offset)
        } : {
            top: 0,
            bottom: 0
        };
        return (this.state.visible || this._animating) ?
            <TouchableWithoutFeedback onPress={this.props.hideOnPress ? this._hide : null}>
                <View style={styles.overlay}>
                    <View style={[
                            styles.defaultStyle,
                            position
                        ]}
                        pointerEvents="box-none"
                    >
                    <Animated.View
                        style={[
                            styles.containerStyle,
                            props.backgroundColor && {backgroundColor: props.backgroundColor},
                            {
                                opacity: this.state.opacity
                            },
                            props.shadow && styles.shadowStyle,
                            props.shadowColor && {shadowColor: props.shadowColor},
                        ]}
                        pointerEvents="none"
                        ref={ele => this._root = ele}
                    >
                        <View style={styles.textView}>
                            <Text style={[
                                styles.textStyle,
                                props.textColor && {color: props.textColor}
                            ]}>{this.props.children}</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.line}/>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={styles.btnTouch} onPress={this._done}>
                                    <Text style={styles.btnTxt}>{this.props.doneTitle}</Text>
                                </TouchableOpacity>
                                {this.props.cancelTitle? [
                                    <View key="line" style={styles.btnLine}/>,
                                    <TouchableOpacity key="cancel" style={styles.btnTouch} onPress={this._cancel}>
                                        <Text style={styles.btnTxt}>{this.props.cancelTitle}</Text>
                                    </TouchableOpacity>
                                ]: null}

                            </View>
                        </View>
                    </Animated.View>
                    </View>
                </View>
            </TouchableWithoutFeedback> : null;
    }
}

export {
    positions,
    durations
}
