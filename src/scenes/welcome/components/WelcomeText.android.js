
import React from 'react';
import {
    Text, View, TouchableOpacity, StyleSheet
} from 'react-native';

import styles from '../styles/welcome.css';

export default props => (
    <View style={{flex: 1, alignItems: 'center',}}>
        <TouchableOpacity onPress={props.onClick}>
            <Text>Android</Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Shake or press menu button for dev menu
        </Text>
    </View>
)