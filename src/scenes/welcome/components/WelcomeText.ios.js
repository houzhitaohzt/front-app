
import React from 'react';
import {
    Text, View, TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';

import styles from '../styles/welcome.css';

export default props => (
    <View style={{flex: 1, alignItems: 'center',}}>
        <TouchableOpacity onPress={props.onClick}>
            <Text>iOS</Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
        </Text>
    </View>
)