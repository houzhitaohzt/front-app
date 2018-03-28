/**
 * @flow
 */

import React from 'react';
import {
    View, ViewPropTypes,
    Platform,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import {mainColors} from '../../styles/main.css';

export default class extends React.PureComponent {

    static propTypes = {
        component: PropTypes.element,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        id: PropTypes.any,
        delayPressIn: PropTypes.number,
    };

    static defaultProps = {
        onPress (){},
        onLongPress (){},
        delayPressIn: 50,
    };

    onPress = () => {
        this.props.onPress(this.props.index, this.props.id);
    };

    onLongPress = ()=>{
        this.props.onLongPress(this.props.index, this.props.id);
    };

    render (){
        let {
            component, children, underlayColor,
            delayPressIn, style = {}, containerStyle = {}
        } = this.props;
        let Comp = component || ( Platform.OS === 'android'? TouchableNativeFeedback: TouchableHighlight);

        return (
            <Comp
                delayPressIn={delayPressIn} delayPressOut={0}
                onPress={this.onPress} onLongPress={this.onLongPress}
                underlayColor={underlayColor || mainColors.touchBack2} style={containerStyle}
            >
                <View style={style}>
                    {children}
                </View>
            </Comp>
        )
    }
}