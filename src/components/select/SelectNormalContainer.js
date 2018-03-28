import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View, TouchableHighlight,
    Text, TouchableWithoutFeedback,
    Animated, BackHandler,
    Dimensions,
    Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LOADING_MAX_WIDTH = 0.8;
const LOADING_ANIMATION_DURATION = 150;
const DIMENSION = Dimensions.get('window');
const WINDOW_WIDTH = DIMENSION.width;

let styles = StyleSheet.create({
    defaultStyle: {
        position: 'absolute',
        width: WINDOW_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0
    },
    containerStyle: {
        // padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 15,
        flexDirection: 'column',
        width: 220,
        minHeight: 100,
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
    titleView: {
        backgroundColor: '#efeff4',
        height: 40,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        justifyContent: 'center',
    },
    titleStyle: {
        color: '#666666',
        fontSize: 17,
        marginHorizontal: 2,
        textAlign: 'center',
    },
    textStyle: {
        fontSize: 17,
        color: '#000033',
        flex: 1,
    },
    container: {
        minHeight: 80,
        marginTop: 9,
        marginBottom: 12,
    },
    listItem: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
});

export default class SelectNormalContainer extends React.Component {
    static displayName = 'SelectNormalContainer';

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
        done: PropTypes.func,
        sections: PropTypes.arrayOf(PropTypes.any),
        value: PropTypes.any,
        labelKey: PropTypes.string,
    };

    static defaultProps = {
        labelKey: 'localName',
        visible: false,
        animation: true,
        shadow: true,
        delay: 0,
        hideOnPress: true,
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
        this._hide();
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

    _done = (item) => {
        if(!this._isHide) return;
        this._hide();
        this.props.done && this.props.done(item);
    };

    renderList = (item, index) =>{
        const {labelKey, value} = this.props;
        let title, check;
        if(xt.isObject(item)){
            title = item[labelKey];
            check = value && value[labelKey] === title;
        } else {
            title = item;
            check = value === item;
        }
        return (
            <TouchableHighlight
                delayPressIn={0}
                delayPressOut={0}
                key={index}
                style={styles.listItem}
                underlayColor="#EFEFF4"
                onPress={this._done.bind(this, item)}
            >
                {
                    check ?
                        <View style={styles.checkItem}>
                            <Text style={[styles.textStyle, {color: '#2095F2'}]}>{title}</Text>
                            <Icon name="check" color='#2095F2' size={22}/>
                        </View>:
                        <Text style={[styles.textStyle, {paddingRight: 20}]}>{title}</Text>
                }
            </TouchableHighlight>
        )
    };

    render() {
        let {props} =  this;
        return (this.state.visible || this._animating) ?
            <TouchableWithoutFeedback onPress={this.props.hideOnPress ? this._hide : null}>
                <View style={styles.overlay}>
                    <View style={styles.defaultStyle} pointerEvents="box-none" >
                        <TouchableWithoutFeedback onPress={()=>{}}>
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

                            <View style={styles.titleView}>
                                <Text style={styles.titleStyle}>{this.props.children}</Text>
                            </View>
                            <View style={styles.container}>
                                {props.sections.map(this.renderList)}
                            </View>

                        </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback> : null;
    }
}