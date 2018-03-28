/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-21 14:41
 */
import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react/native';
import Touchable from '../../../../components/touchable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-swipeable';
import {PagingList} from './../../../../components/paging';
import styles from '../../styles/receive.css';
import {itemSeparatorComponent, ListItem} from '../list';

const SwipeableItem = observer(props => {
    let {item, index, onRightButtonsOpen, onRightButtonsClose, store} = props;
    let rightButtons = [
        <Touchable onPress={store.onStar} index={index} containerStyle={styles.quickCView} style={[styles.quickView, {backgroundColor: '#b1b4b7'}]}>
            <Icon name={item.followMark ? "star-o" : "star"} color={"#fff"} size={18}/>
        </Touchable>,
        <Touchable onPress={store.onForward} index={index} containerStyle={styles.quickCView} style={[styles.quickView, {backgroundColor: '#c3c5c7'}]}>
            <Text style={styles.quickText}>转发</Text>
        </Touchable>,
        <Touchable onPress={store.onReply} index={index} containerStyle={styles.quickCView} style={[styles.quickView, {backgroundColor: '#cdcfd1'}]}>
            <Text style={styles.quickText}>回复</Text>
        </Touchable>,
        <Touchable onPress={store.onDelete} index={index} containerStyle={styles.quickCView} style={[styles.quickView, {backgroundColor: '#ff1212'}]}>
            <Text style={styles.quickText}>删除</Text>
        </Touchable>
    ];
    return (
        <Swipeable
            onRightButtonsOpenRelease={onRightButtonsOpen}
            onRightButtonsCloseRelease={onRightButtonsClose}
            rightButtons={rightButtons}
            rightButtonWidth={60}
        >
            <ListItem {...props}/>
        </Swipeable>
    )
});

@observer
export default class extends React.Component {

    componentWillMount (){
        this.props.store.initData(this.props.currentMail);
    }

    componentWillReceiveProps(props) {
        if (props.currentMail !== this.props.currentMail) {
            props.store.initData(props.currentMail);
        }
    }

    onRightButtonsOpen = (event, gestureState, swipeable) => {
        let { store } = this.props;
        store.swipeable && store.swipeable.recenter();
        store.swipeable = swipeable;
    };

    onRightButtonsClose = (event, gestureState, swipeable) => {
        let { store } = this.props;
        store.swipeable = null;
    };

    onScroll = () => {
        this.props.store.recenterSwipeable();
    };

    renderSwipeableItem = (props) => (
        <SwipeableItem
            {...props} store={this.props.store}
            onRightButtonsClose={this.onRightButtonsClose}
            onRightButtonsOpen={this.onRightButtonsOpen}
        />
    );

    getItemLayout = (data, index) => ({length: 80, offset: 81 * index + 10, index});

    render() {
        let {store, currentMail} = this.props;
        return (
            <PagingList
                ItemSeparatorComponent={itemSeparatorComponent}
                renderItem={this.renderSwipeableItem}
                onPress={store.onRowItem}
                paging={store.paging}
                onScroll={this.onScroll}
                getItemLayout={this.getItemLayout}
                pagingArgs={store.pagingArgs}
            />
        )
    }
}