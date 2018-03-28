/* @flow */
import React from 'react';
import Svg from './../../assets/icons/svg';

export default class extends React.PureComponent {
    render (){
        let {name, size = 31, width, height} = this.props;
        return Svg[name]({size: {width: width || size, height: height || size}})
    }
}