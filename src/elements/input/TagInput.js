/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-15 11:59
 */
import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Icon from '../../elements/icons/Icon';
import Badge from '../../elements/badge/badge';

const {width} = Dimensions.get('window');

type Props = {
    /**
     * A handler to be called when array of tags change
     */
    onChange?: (items: Array<any>) => void,
    /**
     * An array of tags
     */
    value?: Array<any>,
    /**
     * An array os characters to use as tag separators
     */
    separators?: Array<string>,
    /**
     * A RegExp to test tags after enter, space, or a comma is pressed
     */
    regex?: Object,
    /**
     * Styling override for container surrounding tag text
     */
    tagContainerStyle?: Object,
    /**
     * 标签文字样式
     */
    tagTextStyle?: Object,
    /**
     * 文字样式
     */
    textStyle?: Object,
    /**
     * 折叠后文字样式
     */
    foldTextStyle?: Object,
    /**
     * path of the label in tags objects
     */
    labelKey?: string,

    /**
     * 失去焦点时, 是否折叠显示
     */
    fold ?: boolean,

    /**
     * 是否失去焦点提交
     */
    parseOnBlur?: boolean,

    onBlur?: () => void,
};

type State = {
    text: string,
    selectIndex: number,
    value ?: Array<any>,
    isFold ?: boolean
};

type NativeEvent = {
    target: number,
    key: string,
    eventCount: number,
    text: string,
};

type Event = {
    nativeEvent: NativeEvent,
};

const DEFAULT_SEPARATORS = [',', ' ', ';', '\n'];
const DEFAULT_TAG_REGEX = /(.+)/gi;
const defaultInputProps = {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoFocus: false,
    returnKeyType: 'done',
    keyboardType: 'default',
    underlineColorAndroid: 'transparent',
};

export default class TagInput extends Component {

    props: Props;
    state: State;

    static defaultProps = {
        separators: DEFAULT_SEPARATORS,
        regex: DEFAULT_TAG_REGEX,
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isFold: true,
            value: props.value || [],
            selectIndex: -1,
        }
    }

    componentWillReceiveProps(props: Props, state: State) {
        if (props.value !== this.props.value && props.value !== this.state.value) {
            this.setState({value: props.value});
        }
    }

    shouldComponentUpdate(props, state) {
        return (props.value !== this.props.value && props.value !== state.value)
            || state.value !== this.state.value
            || state.text !== this.state.text
            || state.selectIndex !== this.state.selectIndex
            || (props.fold && state.isFold !== this.state.isFold);
    }

    onChange = (event: Event) => {
        let that = this;
        if (!event || !event.nativeEvent)
            return;

        const text = event.nativeEvent.text;
        const lastTyped = text.charAt(text.length - 1);
        const parseWhen = that.props.separators;

        if (parseWhen.indexOf(lastTyped) > -1) {
            that.setState({text: text.substring(0, text.length - 1)}, that.parseTags);
        } else {
            that.setState({text: text});
        }
    };

    onBlur = (event: Event) => {
        let that = this;
        if (that.state.text && that.state.text.length && that.props.parseOnBlur) {
            that.parseTags(that.props.onBlur);
        } else {
            that.props.onBlur && that.props.onBlur();
        }
        that.setState({isFold: true, selectIndex: -1});
    };

    onFocus = () => {
        let that = this;
        let focus = that.props.onFocus;
        that.setState({ isFold: false }, focus);
    }

    parseTags = (callback) => {
        const {text, value} = this.state;
        const regex = this.props.regex;
        const results = text.match(regex);

        if (results && results.length > 0) {
            this.onChangeTags([...new Set([...value, text])], callback);
        } else {
            callback && callback();
        }
    };

    onChangeTags = (tags, callback) => {
        const {onChange} = this.props;
        this.setState({text: '', value: tags, selectIndex: -1}, () => {
            onChange && onChange(tags);
            callback && callback();
        });
    };

    onKeyPress = (event: Event) => {
        let that = this;
        if (that.state.text === '' && event.nativeEvent && event.nativeEvent.key == 'Backspace') {
            let index = this.state.value.length - 1;
            that.state.selectIndex === index ? that.pop() : that.setState({selectIndex: index});
        }
    };

    focus = () => {
        if (this.refs.tagInput)
            this.refs.tagInput.focus();
    };

    blur = () => {
        if (this.refs.tagInput)
            this.refs.tagInput.blur();
    }

    onViewFocus = () => {
        this.setState({isFold: false}, this.focus);
    };

    pop = () => {
        const tags = [...this.state.value];
        tags.pop();
        this.onChangeTags(tags);
        this.focus();
    };

    removeSelect = () => {
        let that = this;
        let {selectIndex, value} = that.state;
        if (selectIndex !== -1) {
            const tags = [...value];
            tags.splice(selectIndex, 1);
            that.onChangeTags(tags);
        }
    }

    tagSelect = (index: number) => {
        if (index === this.state.selectIndex) index = -1;
        this.setState({selectIndex: index});
    };

    _getLabelValue = (tag) => {
        const {labelKey} = this.props;

        if (labelKey) {
            if (labelKey in tag) {
                return tag[labelKey];
            }
        }

        return tag;
    };

    _renderTag = (tag, index) => {
        let {selectIndex} = this.state;
        let isSelect = index === selectIndex;
        return (
            <TouchableOpacity
                key={index}
                ref={'tag' + index}
                style={[styles.tag, this.props.tagContainerStyle, isSelect && styles.tagSelect]}
                onPress={() => this.tagSelect(index)}>
                <Text style={[styles.tagText, this.props.tagTextStyle, isSelect && styles.tagTextSelect]}
                      numberOfLines={1}>
                    {this._getLabelValue(tag)}
                </Text>
                {isSelect && <Icon name='clear' size={12} reverse type='material' containerStyle={styles.delTag}
                                   scale={1.2} color='#ddd' reverseColor='#993333' onPress={this.removeSelect}/>}
            </TouchableOpacity>
        );
    };

    _renderInput = ()=>{
        let that = this;
        const {text, value, isFold} = that.state;
        const {
            value: av, separators, regex, tagContainerStyle, tagTextStyle,
            textStyle, labelKey, style, fold, foldTextStyle, ...rest
        } = that.props;

        const inputProps = {...defaultInputProps, ...rest};
        return (
            <View
                style={[styles.wrapper, style && style]}
                ref="wrapper"
                onLayout={that.measureWrapper}>
                {value.map(that._renderTag)}
                <TextInput
                    ref="tagInput"
                    blurOnSubmit={false}
                    onKeyPress={that.onKeyPress}
                    value={text}
                    style={[styles.textInput, textStyle]}
                    {...inputProps}
                    onBlur={that.onBlur}
                    onFocus={that.onFocus}
                    onChange={that.onChange}
                    onSubmitEditing={that.parseTags}
                />
            </View>
        )
    };

    _renderFold = ()=>{
        const { value } = this.state;
        const { foldTextStyle } = this.props;
        return (
            <View style={styles.foldView}>
                <View style={{flex: 1}}><Text numberOfLines={1} style={[styles.foldText, foldTextStyle]}>{value.join('、')}</Text></View>
                <Badge value={value.length} textStyle={styles.badgeText} containerStyle={styles.badgeContainer}/>
            </View>
        )
    }

    render() {
        let that = this;
        const {text, value, isFold} = that.state;
        const { fold } = that.props;
        return (
            <TouchableWithoutFeedback onPress={that.onViewFocus} style={styles.container}>
                { fold && isFold && value.length > 0 ? that._renderFold() : that._renderInput()  }
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    foldView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    foldText: {
        fontSize: 14, color: '#666666',
    },
    textInput: {
        height: 24, flex: 1, padding: 0, margin: 2, minWidth: 100,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        padding: 8,
        height: 24,
        borderRadius: 2,
        backgroundColor: '#dddddd',
    },
    tagSelect: {
        backgroundColor: '#0076ff',
    },
    tagText: {
        fontSize: 14, color: '#666666',  padding: 0,  margin: 0,
    },
    tagTextSelect: {
        color: '#F5FCFF',
    },
    delTag: {
        margin: 0, position: 'absolute', right: 0, marginRight: 2,
    },

    badgeText: {
        fontSize: 10, color: '#666'
    },

    badgeContainer: {
        padding: 5, backgroundColor: '#ddd',
        ...Platform.select({
            android: {
                paddingTop: 1, paddingBottom: 1
            },
            ios: {
                paddingTop: 2, paddingBottom: 2
            }
        })
    },
});

export {DEFAULT_SEPARATORS, DEFAULT_TAG_REGEX}