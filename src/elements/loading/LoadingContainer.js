import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text, TouchableWithoutFeedback,
    Animated,
    Dimensions,
    Easing, ActivityIndicator
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
    LONG: 3500,
    SHORT: 2000
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
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 6,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'column',
        minWidth: 90,
        minHeight: 70,
        marginHorizontal: WINDOW_WIDTH * ((1 - LOADING_MAX_WIDTH) / 2)
    },
    shadowStyle: {
        shadowColor: '#d1d0d1',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 1
    },
    textStyle: {
        paddingTop: 8,
        fontSize: 12,
        color: '#fff',
        textAlign: 'center'
    },
    overlay: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
});

class LoadingContainer extends Component {
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
        onShown: PropTypes.func
    };

    static defaultProps = {
        visible: false,
        duration: durations.NONE,
        animation: true,
        shadow: true,
        position: positions.CENTER,
        delay: 0,
        hideOnPress: false
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

    _animating = false;
    _root = null;
    _hideTimeout = null;
    _showTimeout = null;

    _show = () => {
        this._isHide = true;
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
        if(!this._isHide  || this._animating) return;
        this._isHide = false;
        clearTimeout(this._showTimeout);
        clearTimeout(this._hideTimeout);
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
                        <ActivityIndicator animating={true} size={'large'} color="#e9e9e9"/>
                        <Text style={[
                            styles.textStyle,
                            props.textColor && {color: props.textColor}
                        ]}>
                            {this.props.children}
                        </Text>
                    </Animated.View>
                    </View>
                </View>
            </TouchableWithoutFeedback> : null;
    }
}

export default LoadingContainer;
export {
    positions,
    durations
}
