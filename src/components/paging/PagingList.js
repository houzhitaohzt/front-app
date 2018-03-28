/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-08-28 10:40
 */
import React from 'react';
import {StyleSheet, InteractionManager} from 'react-native';
import {observer} from 'mobx-react/native';
import RefreshList from '../list/RefreshList';
import Paging, {PagingTail} from './index';
import xt from '../../extension/index';

type Props = {
    paging: Paging,
    pagingArgs: ?Object,
}

@observer
export default class extends React.Component {
    props: Props;

    componentDidMount() {
        let {paging, pagingArgs} = this.props;
        if(!paging.dataList || !paging.dataList.length || xt.equalsObject(paging.lastArgs, pagingArgs)){
            this.fetchPage();
        }
    }

    componentWillReceiveProps(props, state) {
        if(xt.equalsObject(props.pagingArgs, this.props.pagingArgs)){
            this.fetchPage(props);
        }
    }

    componentWillUnmount() {
        this.props.paging.dispose();
    }

    fetchPage = (props: Props) => {
        let {paging, pagingArgs} = props || this.props;
        InteractionManager.runAfterInteractions(()=>{
            paging.fetchFirst(pagingArgs, null, xt.ui.showEToast);
        });
    };

    fetchNextPage = ({distanceFromEnd}) => {
        let {paging, pagingArgs} = this.props;
        InteractionManager.runAfterInteractions(()=>{
            paging.fetchNext(pagingArgs, null, xt.ui.showEToast);
        });
    };

    keyExtractor = (item, index) => item[this.props.paging.uniqueKey] + '-' + index;
    listFooterComponent = ()=>  <PagingTail paging={this.props.paging}/>;

    render() {
        let that = this;
        let {  paging, pagingArgs, ...rest } = that.props;
        return (
            <RefreshList
                keyExtractor={that.keyExtractor}
                onEndReached={that.fetchNextPage}
                ListFooterComponent={that.listFooterComponent}
                refreshing={paging.isRefreshing}
                onRefresh={that.fetchPage}
                data={paging.dataList}
                {...rest}
            />
        );
    }
}