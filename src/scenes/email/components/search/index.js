/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-09 17:12
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import searchStore from '../../store/SearchStore';

@observer
export class Search extends React.Component {
    static propTypes = {
        store: PropTypes.object
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Search Email!
                </Text>
            </View>
        );
    }
}

export default () => <Search store={searchStore}/>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    title: {
        color: '#fff',
        alignSelf: 'center',
        // marginRight: 60,//leftbutton
        marginLeft: 10,//right
    },
    rightView: {
        flex: 1,
        flexDirection: 'row',
        width: 70,
    },
    rightTouch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});