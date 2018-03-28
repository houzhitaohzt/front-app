/**
 * 主界面导航
 * @flow
 */
import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Platform} from "react-native";
import {constant, mainColors, mainStyles} from './../styles/main.css';
import {Scene, Drawer, Tabs} from "react-native-router-flux";

import {
    renderTitle, renderRightButton, Dustbin,
    Drawer as MailDrawer, Remove, Sent,
     Search, Receive, Write, Detail, Contact,
} from './../scenes/email';

import {
    TopTabs, HideNav
} from './RConst';

//common
import {ListSelect, ListSelectRight} from '../scenes/common';

export default (props) => ([
    <Drawer
        key="email"
        contentComponent={MailDrawer}
        headerMode="screen"
        right={renderRightButton}
        renderTitle={renderTitle}
        title="文件夹"
        drawerPosition='right'
        titleCenter
    >
        <HideNav key="mailReceive" component={Receive.default} renderTitle={Receive.NavTitle} right={Receive.NavRight}/>
        <HideNav key="mailSent" component={Sent} title="已发送"/>
        <HideNav key="mailRemove" component={Remove} title="已删除"/>
        <HideNav key="mailDustbin" component={Dustbin} title="垃圾箱"/>
    </Drawer>,
    <Scene key="mailWrite" component={Write.default} title="写邮件" right={Write.NavRight}/>,
    <Scene key="mailSearch" component={Search} title="搜索"/>,
    <Scene key="mailDetail" titleCenter component={Detail.default} right={Detail.NavRight}/>,

    <TopTabs key="mailSelectContact" getTitle={props => props.title} scrollEnabled={false} right={ListSelectRight} r={0}>
        <HideNav key="_mailSelectContact_" component={ListSelect} tabBarLabel="最近联系人" {...Contact.Const.lately}/>
        <HideNav key="_mailSelectContact2_" component={ListSelect} tabBarLabel="内部联系人" {...Contact.Const.inside} renderItem={Contact.Inside}/>
        <HideNav key="_mailSelectContact3_" component={ListSelect} tabBarLabel="外部联系人" {...Contact.Const.outside} />
    </TopTabs>,
]);