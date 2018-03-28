/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-12 16:30
 */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';


@observer
export default class PieceList extends React.Component {

    render() {
        let List = this.props.children;
        return (
            <View style={styles.container}>
                <List/>
            </View>
        );
    }
}

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
});