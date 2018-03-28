import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View, TouchableOpacity,
    Text, TouchableWithoutFeedback,
    Animated, BackHandler,
    Dimensions,
    Easing
} from 'react-native';

const MAX_WIDTH = 0.8;
const ANIMATION_DURATION = 100;
const DIMENSION = Dimensions.get('window');
const WINDOW_WIDTH = DIMENSION.width;

let styles = StyleSheet.create({
    defaultStyle: {
        position: 'absolute',
        width: WINDOW_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10
    },
    containerStyle: {
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 10,
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ddd',
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 10
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    btnContainer: {
        height: 45,
        justifyContent: 'flex-start',
    },

    btnTouch: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTxt: {
        color: '#2095f2',
        fontSize: 17,
    },
    overlay: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    cancel: {
        marginTop: 8,
        height: 45,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
    }
});

export default class extends Component {
    static displayName = 'LoadingContainer';

    static propTypes = {
        ...View.propTypes,
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
        animation: true,
        shadow: true,
        delay: 0,
        hideOnPress: false,
        doneTitle: '确定',
    };

    constructor() {
        super(...arguments);
        this.state = {
            visible: this.props.visible,
            top: new Animated.Value(200)
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
        this.props.cancelTitle ? this._cancel() : this._done();
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
            Animated.timing(this.state.top, {
                toValue: 0,
                duration: this.props.animation ? ANIMATION_DURATION : 0,
                easing: Easing.out(Easing.ease)
            }).start(({finished}) => {
                if (finished) {
                    this._animating = !finished;
                    this.props.onShown && this.props.onShown(this.props.siblingManager);
                }
            });
        }
    };

    _hide = () => {
        if (!this._isHide || this._animating) return;
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
            Animated.timing(this.state.top, {
                toValue: 200,
                duration: this.props.animation ? ANIMATION_DURATION : 0,
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

    _cancel = () => {
        if (!this._isHide) return;
        this._hide();
        this.props.cancel && this.props.cancel();
    };

    _onItem(item) {
        this._cancel();
        item.onPress && item.onPress();
    };

    renderSelect = (item, index) => {
        return (
            <View style={styles.btnContainer} key={index}>
                {index > 0 ? <View style={styles.line}/> : null}
                <TouchableOpacity style={styles.btnTouch} onPress={this._onItem.bind(this, item)}>
                    <Text style={styles.btnTxt}>{item.label}</Text>
                </TouchableOpacity>
            </View>
        )
    };

    render() {
        let {props} = this;
        return (this.state.visible || this._animating) ?
            <TouchableWithoutFeedback onPress={this._hide}>
                <View style={styles.overlay}>
                    <View style={styles.defaultStyle} pointerEvents="box-none">
                        <Animated.View
                            style={[
                                styles.containerStyle,
                                props.backgroundColor && {backgroundColor: props.backgroundColor},
                                {
                                    top: this.state.top
                                },
                                props.shadow && styles.shadowStyle,
                                props.shadowColor && {shadowColor: props.shadowColor},
                            ]}
                            pointerEvents="none"
                            ref={ele => this._root = ele}
                        >

                            <View style={styles.container}>
                                {props.children.map(this.renderSelect)}
                            </View>

                            <View style={styles.cancel}>
                                <TouchableOpacity key="cancel" onPress={this._cancel} style={styles.btnTouch}>
                                    <Text style={styles.btnTxt}>{this.props.cancelTitle}</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </TouchableWithoutFeedback> : null;
    }
}