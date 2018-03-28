/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-21 16:55
 */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react/native';


export default observer(({style, data = [], textStyle, uniqueKey, labelKey, placeholder}) =>
    <View style={styles.container}>
        {
            data.length?
                data.map(da =>
                    <View style={[styles.tag, style && style]} key={da[uniqueKey]}>
                        <Text style={[styles.tagText, textStyle]} numberOfLines={1}>{da[labelKey]}</Text>
                    </View>
                ) :
                <Text style={styles.tagText}>{placeholder}</Text>
        }
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
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

    tagText: {
        fontSize: 14, color: '#666666', padding: 0, margin: 0,
    },
});