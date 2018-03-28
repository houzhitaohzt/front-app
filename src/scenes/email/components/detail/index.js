/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-22 17:57
 */
import React from 'react';
import {Text, View, InteractionManager, TouchableOpacity, ScrollView} from 'react-native';
import {observer} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import detailStore from '../../store/DetailStore';
import Title from './Title';
import FileDown from "./FileDown";
import Context from './Context';
import BottomBar from './BottomBar'
import {mainColors, mainStyles} from '../../../../styles/main.css';

import styles from '../../styles/detail.css';

export default observer(class extends React.Component {

    constructor(props) {
        super(props);
        detailStore.initData(props.item);
    }

    componentDidMount() {
        let {item} = this.props;
        InteractionManager.runAfterInteractions(()=>{
            detailStore.fetchDetail(item);
        });
    }

    render (){
        let {item} = this.props;
        return (
            <View style={styles.container}>
                    <Title item={item} store={detailStore}/>
                    <FileDown store={detailStore} item={item}/>
                    <Context store={detailStore}/>
                <BottomBar store={detailStore} item={item}/>
            </View>
        )
    }
})

export function NavRight(){
    return (
        <View style={mainStyles.topNavRightV} >
            {/*<TouchableOpacity style={mainStyles.topNavRight} onPress={detailStore.onNext}>*/}
                {/*<Icon name='angle-up' size={26} color='#fff'/>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity style={mainStyles.topNavRight} onPress={detailStore.onLast}>*/}
                {/*<Icon name='angle-down' size={26} color='#fff'/>*/}
            {/*</TouchableOpacity>*/}
        </View>
    )
}