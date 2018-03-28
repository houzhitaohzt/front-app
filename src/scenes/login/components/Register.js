import {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * 注册
 * @author tangzehua
 * @since 2017-05-14 01:37
 * @type {Function|*|Class}
 */
class Register extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Register!
                </Text>
            </View>
        );
    }
}

export default props => <Register/>

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