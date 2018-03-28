/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-17 14:19
 */

import React from 'react';
import {
    Animated,
    AsyncStorage,
    Easing,
    Image,
    ListView,
    Modal,
    StyleSheet,
    Text,
    TextInput, Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {getIOSSpacer} from '../../../elements/keyboard';
import Icon from './../../../elements/icons/Icon';
import Button from './../../../elements/buttons';
import {mainColors} from './../../../styles/main.css';
import Avatar from '../../../elements/avatar/Avatar';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import xt from '../../../extension'
import moment from 'moment';

const ITEM_TYPE = {
    MRHJ: 1, // 默认货架
    IMAGE: 2, //图片
    NEW: 99,
    HELP: 0,
};


export default class Message extends React.Component {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        // 实际的DataSources存放在state中
        this.state = {
            inputText1: "",
            modalVisibility: false,
            imageViews: {
                index: 0,
                imageUrls: []
            },
            messageList: ds.cloneWithRows([]),
        };
        this.itemType = null;
        this.lastCode = null;
        this.MessageListView = null;
        this.showMaxSize = 150;

        this.isOpenMenu = true;
        this._animTopMax = 50;
        this._animTop = new Animated.Value(this._animTopMax);
        this._animTop2 = new Animated.Value(0);

        this._gunCodeCall = this._gunCode.bind(this);
    }

    shouldComponentUpdate(props, state) {
        return Object.keys(state).findIndex(key => state[key] !== this.state[key]) !== -1;
    }

    componentDidMount() {
        let that = this;
        AsyncStorage.getItem("WebChat_Message_temp", (error, value) => {
            if (!error && value) {
                let msgList = JSON.parse(value);
                msgList.unshift({messageType: 99, message: "以上是历史记录"});
                that.setState({messageList: that.state.messageList.cloneWithRows(msgList)});
            } else {
                that.setState({messageList: that.state.messageList.cloneWithRows([{message: "我是消息系统, 很高兴为你服务!"}])})
            }
        });
    }

    _gunCode(value) {
        this.lastCode = value;
        this.querydhys(value);
    }

    onSubmitEditing = () => {
        if (this.state.inputText1.trim() === '') return;
        // this.refs.inputText1.blur();
        this._gunCodeCall(this.state.inputText1);
    };

    async _pushMessage(message) {
        let that = this;
        if (!message) return;

        let msgList = Array.from(that.state.messageList._dataBlob.s1);
        let messageAry = !Array.isArray(message) ? [message] : message;

        messageAry.forEach(msg => {
            msg['MessageCreateTime'] = moment().format("M月DD日 HH:mm");
            msg.messageType = msg.messageType || 0;
            msgList.unshift(msg);
        });

        msgList = msgList.slice(0, that.showMaxSize);
        // let bd = Date.now();
        that.setState({messageList: that.state.messageList.cloneWithRows(msgList)}, () => {
            setTimeout(() => {
                that.MessageListView.scrollTo({x: 0, y: 0, animated: true});
            }, 100);
        });
        AsyncStorage.setItem("WebChat_Message_temp", JSON.stringify(msgList));
    }

    //查询
    querydhys(code) {
        let that = this;
        that._pushMessage({messageType: 0, message: code, type: 1});
        that.setState({inputText1: ''});

        setTimeout(() => {
            that._pushMessage([
                {message: "😱😱😱😱😱\n信息发送失败", type: 0},
                {message: "服务器开小差去了, 稍后再试试吧!\n实在不行联系下开发小哥吧.", type: 0}
            ]);
        }, 500);
    }

    renderMessage = msgData => {
        let {avatar} = this.props;
        let message = msgData.messageType === ITEM_TYPE.IMAGE ?
            <Image resizeMode="contain" source={msgData.message} style={{width: 200, height: 120}}/>
            : <Text style={styles.messageText}>{msgData.message}</Text>;

        if (msgData.type === 1) {
            return (
                <View style={[styles.messageBody, {justifyContent: 'flex-end'}]}>
                    <TouchableOpacity activeOpacity={1} style={styles.messageBodyRightText} onPress={()=>this.messageClick(msgData)}>
                        {message}
                    </TouchableOpacity>
                    <Icon name='play' color='#a0e75a' size={8} containerStyle={{marginTop: 9, marginRight: 4}}/>
                    <Avatar width={36} containerStyle={{padding: 5}} rounded={false} source={avatar}/>
                </View>
            );
        } else {
            let systemAvatar = require("../../../assets/avatar/2.png");
            return (
                <View style={[styles.messageBody, {justifyContent: 'flex-start'}]}>
                    <Avatar width={36} containerStyle={{padding: 5}} rounded={false} source={systemAvatar}/>
                    <Icon name='play' color='#fff' size={8}
                          containerStyle={{marginTop: 9, marginLeft: 4, transform: [{rotate: '180deg'}]}}/>
                    <TouchableOpacity activeOpacity={1} style={styles.messageBodyLeftText} onPress={()=>this.messageClick(msgData)}>
                        {message}
                    </TouchableOpacity>
                </View>
            );
        }
    };

    renderType = msgData => {
        switch (msgData.messageType) {
            case 99:
                return this.renderSystem(msgData);
            case 0:
            default:
                return this.renderMessage(msgData);
        }
    };

    renderTime = (msgData, rowID) => {
        rowID = parseInt(rowID);
        let list = this.state.messageList._dataBlob.s1;
        let lastTime = rowID < (list.length - 1) ? list[rowID + 1]: null;

        if ((lastTime && !lastTime.MessageCreateTime) || ( lastTime && msgData.MessageCreateTime && msgData.MessageCreateTime !== lastTime.MessageCreateTime)) {
            return (
                <View style={{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
                    <Text style={styles.messageDate}>{msgData.MessageCreateTime}</Text>
                </View>
            );
        }

        return null;
    };

    renderSystem = msgData => {
        return (
            <View style={{alignItems: 'center', marginTop: 10, marginBottom: 20}}>
                <Text style={styles.messageSystem}>{msgData.message}</Text>
            </View>
        );
    };

    renderRow = (msgData, sectionID, rowID) => {
        console.log(msgData)
        return (
            <View key={rowID} style={{flexDirection: 'column', marginBottom: 12}}>
                {this.renderTime(msgData, rowID)}
                {this.renderType(msgData, rowID)}
            </View>
        );
    };

    _openMenu = () => {
        this.isOpenMenu = !this.isOpenMenu;
        let value1 = 0, value2 = this._animTopMax;
        if (this.isOpenMenu) {
            this.refs.inputText1.blur();
            value1 = this._animTopMax;
            value2 = 0;
        }
        let animList = [
            Animated.timing(this._animTop2, {
                toValue: value2,
                duration: 80,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(this._animTop, {
                toValue: value1,
                duration: 80,
                easing: Easing.out(Easing.ease),
            })
        ];

        Animated.sequence(this.isOpenMenu ? animList.reverse() : animList).start();
    };

    /**
     * 扫码输入框
     * @returns {XML}
     */
    renderInput() {
        return (
            <Animated.View style={[styles.menuControl, styles.menuControl2, {top: this._animTop}]}>
                <Icon type="material" name="keyboard-hide" size={24} color="#777"
                      containerStyle={{padding: 15,}} onPress={this._openMenu}/>
                <View style={styles.searchBox}>
                    <TextInput underlineColorAndroid={'transparent'} value={this.state.inputText1} ref="inputText1"
                               autoCapitalize={'none'} onChangeText={inputText1 => this.setState({inputText1})}
                               style={[styles.inputText, {marginBottom: -7, marginLeft: 0}]}
                               onSubmitEditing={this.onSubmitEditing}
                    />
                </View>
                <Button backgroundColor="#e1e8ee" buttonStyle={styles.textButton} title="发送"
                        color="#777" borderRadius={4} onPress={this.onSubmitEditing}/>
            </Animated.View>
        );
    }

    menuItemClick(itemType) {
        let that = this;
        that.itemType = itemType;
        switch (itemType) {
            case ITEM_TYPE.MRHJ:
                if (that.lastCode) {
                    this.querydhys(that.lastCode);
                } else {
                    that._pushMessage({message: '给我来一碟图片', type: 1});
                    setTimeout(() => {
                        let image = [
                            require("../../../assets/wk/11.jpg"),
                            require("../../../assets/wk/13.jpg"),
                            require("../../../assets/wk/14.jpg"),
                            require("../../../assets/wk/15.jpg"),
                            require("../../../assets/avatar/1.jpg"),
                            require("../../../assets/avatar/2.png"),
                            require("../../../assets/avatar/3.jpg"),
                            require("../../../assets/avatar/4.jpg")
                        ];
                        that.imageIndex = (that.imageIndex || 0) + 1;
                        that.imageIndex = that.imageIndex >= image.length ? 0 : that.imageIndex;
                        that._pushMessage([
                            {message: "请注意查收!", type: 2},
                            {message: image[that.imageIndex], type: 2, messageType: ITEM_TYPE.IMAGE}
                        ]);
                    }, 1000);
                }
                break;
            case ITEM_TYPE.NEW:
                that._pushMessage({message: '亲, 等待新功能开发呢!'});
                break;
            case ITEM_TYPE.HELP:
            default:
                this._pushMessage([
                    {message: "给我点提示", type: 1},
                    {
                        message: "1. 左下角有个键盘, 点击进入输入状态!\n" +
                        "2. 你看到的都是假的, 🙅\n\n" +
                        "提示:\n目前只是开发阶段, 自娱自乐.\n更多功能期待后续版本!",
                        type: 0
                    }
                ]);
                break;
        }
    }

    renderMenu() {
        return (
            <Animated.View style={[styles.menuControl, styles.menuControl2, {top: this._animTop2}]}>
                <Icon type="material" name="keyboard-hide" size={24} color="#777" onPress={this._openMenu}
                      iconStyle={{transform: [{rotate: '180deg'}]}}
                      containerStyle={{padding: 15, borderRightWidth: 0.5, borderColor: '#d6d6d6'}}/>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.menuItemClick.bind(this, ITEM_TYPE.MRHJ)} style={styles.menuItem}>
                        <Text style={{color: '#333'}}>美图</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.menuItemClick.bind(this, ITEM_TYPE.NEW)} style={styles.menuItem}>
                        <Text style={{color: '#333'}}>❤</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.menuItemClick.bind(this, ITEM_TYPE.HELP)} style={styles.menuItem}>
                        <Text style={{color: '#333'}}>帮助</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }

    renderFooter() {
        return (
            <View style={styles.menuControl}>
                {this.renderInput()}
                {this.renderMenu()}
            </View>
        );
    }

    //界面变化触发
    _onListViewLayout = (event) =>{
        this.MessageListView.scrollTo({y: 0, x: 0, animated:true});
    };

    closeModal = () => {
        this.setState({ modalVisibility: false})
    };

    _showImageViewer = (src) => {
        let that = this;
        let list = Array.from(this.state.messageList._dataBlob.s1).filter(da => da.messageType === ITEM_TYPE.IMAGE);
        let imageUrls = list.map((da, index) => da.message);
        let index = list.findIndex(da => da.messageType === ITEM_TYPE.IMAGE && da.message === src);
        that.setState({
            modalVisibility: true,
            imageViews: {
                index: index,
                imageUrls: imageUrls
            }
        })
    };

    messageClick (item){
        if(item.messageType === ITEM_TYPE.IMAGE){
            this._showImageViewer(item.message);
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <ListView
                    contentContainerStyle={{paddingVertical: 15}}
                    keyboardDismissMode='on-drag'
                    ref={view => this.MessageListView = view}
                    initialListSize={20}
                    enableEmptySections={true}
                    pageSize={3}
                    dataSource={this.state.messageList}
                    renderRow={this.renderRow}
                    onLayout={this._onListViewLayout}
                    // onContentSizeChange={this.onContentSizeChange.bind(this)}
                    renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                />
                {this.renderFooter()}
                {getIOSSpacer()}
                <Modal visible={this.state.modalVisibility} transparent={false} onRequestClose={this.closeModal}>
                    <View style={{ backgroundColor: '#000'}}>
                        <TouchableWithoutFeedback onPress={this.closeModal}>
                            <Image resizeMode="contain" source={this.state.imageViews.imageUrls[this.state.imageViews.index]} style={{width: xt.ui.width, height: xt.ui.height}}/>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column', backgroundColor: '#efeff4', flex: 1
    },

    messageBody: {
        flexDirection: 'row', marginHorizontal: 10, alignItems: 'flex-start'
    },

    messageBodyLeftText: {
        borderRadius: 4, backgroundColor: '#fff', padding: 3, marginRight: 80
    },

    messageBodyRightText: {
        borderRadius: 4, backgroundColor: '#a0e75a', padding: 3, marginLeft: 80
    },

    messageDate: {
        color: '#fff', fontSize: 14, borderRadius: 3, paddingHorizontal: 8, backgroundColor: mainColors.grey4
    },

    messageSystem: {
        color: '#fff', fontSize: 14, borderRadius: 3, paddingHorizontal: 8, backgroundColor: mainColors.grey4
    },

    messageText: {
        color: '#333', fontSize: 15, paddingHorizontal: 6, paddingVertical: 5
    },

    tableTr: {
        flexDirection: 'row', alignItems: 'center',
        borderBottomWidth: 0, borderColor: "#ebebeb", paddingVertical: 2,
    },

    textButton: {
        paddingTop: 6,
        paddingBottom: 6,
        marginLeft: 0,
        marginRight: 0,
    },

    menuControl: {
        height: 50, flexDirection: 'row', alignItems: 'center',
    },

    menuItem: {
        flex: 1, alignItems: 'center', borderRightWidth: 0.5,
        paddingVertical: 10,
        justifyContent: 'center', borderColor: '#dddddd'
    },

    menuControl2: {
        backgroundColor: '#fafafa', left: 0, right: 0, position: 'absolute'
    },

    searchBox: {
        height: 30, flexDirection: 'row', flex: 1,
        borderRadius: 5, borderWidth: 1, borderColor: '#bbe5ef',
        backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
    },

    inputText: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 14,
        marginLeft: 5,
        marginRight: -6,
        marginBottom: -5,
        marginTop: -4
    }
});