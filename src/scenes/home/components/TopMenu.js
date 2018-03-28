/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-03 15:45
 */
import React from 'react';
import {View, Image, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {observer} from 'mobx-react/native';
import SvgIcon from '../../../components/icons/SvgIcon';
import Badge from './../../../elements/badge/badge';
import {mainColors} from './../../../styles/main.css';
import styles from './../styles/top.css';

const Menu = props => (
    <TouchableHighlight
        delayPressIn={0}
        delayPressOut={0}
        underlayColor={mainColors.touchBack}
        key={props.title}
        onPress={props.onPress}
        style={styles.menuContainer}
    >
        <View style={styles.menu}>
            <View style={styles.svgIcon}><SvgIcon name={props.name} width={31} height={23}/></View>
            <Text style={{color: mainColors.mainText}}>{props.title}</Text>
            {
                props.badge > 0 ? (
                    <Badge
                        value={props.badge > 99? "99+": props.badge}
                        textStyle={styles.badgeText}
                        containerStyle={styles.badgeContainer}
                        wrapperStyle={styles.badgeWrapper}
                    />
                ): null
            }
        </View>
    </TouchableHighlight>
);

export default observer(({ store }) => (
    <View style={styles.container}>
        <Image source={require('../../../assets/images/home_1.png')} style={{width: '100%'}} resizeMode='cover'/>
        {/*<Menu name="h-mail" title="邮件" onPress={store.onMailPress} badge={store.mailNum}/>*/}
        {/*<Menu name="h-task" title="任务" onPress={store.onTaskPress} badge={store.taskNum}/>*/}
        {/*<Menu name="h-schedule" title="日程" onPress={store.onSchedulePress} badge={store.scheduleNum}/>*/}
    </View>
));