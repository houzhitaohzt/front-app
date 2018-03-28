/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-01 14:09
 */
import React from 'react';
import {ColorPropType, Platform, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react/native';

type Props = {
    fontSize: ?number,
    fontFamily: ?string,
    color: ?ColorPropType,
    c1: ?boolean,
    c2: ?boolean,
    c3: ?boolean,
    blue:? boolean
}

@observer
export default class extends React.Component {
    props: Props;

    render () {
        let {
            style, children, fontSize, fontFamily, color,
            c1, c2, c3, blue, textAlign, ...rest
        } = this.props;
        return (
            <Text
                adjustsFontSizeToFit={false}
                allowFontScaling={false}
                style={[
                    styles.text,
                    color && { color },
                    c1 && { color: '#666666'},
                    c2 && { color: '#999999'},
                    c3 && { color: '#B8B8B8'},
                    blue && { color: '#2095F2'},
                    textAlign && { textAlign },
                    fontSize && { fontSize },
                    fontFamily && { fontFamily },
                    style && style
                ]}
                {...rest}
            >{children}</Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#000033',
        ...Platform.select({
            android: {
                fontFamily: 'sans-serif',
            }
        })
    }
});