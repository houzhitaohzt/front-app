/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-15 10:38
 */
import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import MIcons from 'react-native-vector-icons/MaterialIcons';

const {width: screenWidth} = Dimensions.get('window');
import {mainColors} from './../../styles/main.css';

export default class extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        direction: PropTypes.string,
        onPress: PropTypes.func,
        value: PropTypes.any,
        labelKey: PropTypes.string,
        position: PropTypes.number,
        onHide: PropTypes.func,
    };

    static defaultProps = {
        labelKey: 'label',
        position: 2,
        onPress: ()=>{},
        onHide: ()=>{}
    };

    renderItem = (item, index) => {
        let {onPress, labelKey, value} = this.props;
        const title = item[labelKey];
        const check = value && value[labelKey] === title;
        return (
            <TouchableOpacity
                delayPressIn={0}
                delayPressOut={0}
                key={index} activeOpacity={0.6}
                style={[styles.item, {borderTopWidth: index === 0? 0: StyleSheet.hairlineWidth}]}
                onPress={()=> onPress(item)}
            >
                {
                    check?
                        [
                            <MIcons key='1' name="check" color='#2095F2' size={22}/>,
                            <Text key="2" style={[styles.itemText, {color: '#2095F2'}]}>{title}</Text>
                        ]:
                        <Text style={[styles.itemText, {paddingLeft: 18}]}>{title}</Text>
                }
            </TouchableOpacity>
        );
    };

    render() {
        let {data, position, visible, onHide} = this.props;
        if( !visible) return null;
        let left = (screenWidth / position) - 80;
        return (
            <TouchableWithoutFeedback onPress={onHide}>
                <View style={styles.maskContainer}>
                    <View style={[styles.container, {left: left}]}>
                        <Icon name="play" style={styles.arrow} color="#fff" size={14}/>
                        <View style={[styles.selectContainer]}>
                            {data.map(this.renderItem)}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    maskContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        left: 0, right: 0, bottom: 0, top: 0
    },
    container: {
        width: 160,
        alignItems: 'center',
        // minHeight: 50,
    },

    selectContainer: {
        zIndex: 1,
        minHeight: 50,
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: -2,
        borderRadius: 5,
    },
    arrow: {
        zIndex: 10,
        height: 15,
        transform: [{rotate: '-90deg'}],
        marginBottom: -2,
    },
    itemText: {
        fontSize: 14,
        marginLeft: 8,
        color: mainColors.mainText
    },
    item: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 15,
        // justifyContent: 'center',
        borderColor: mainColors.mainLine,
    }
});