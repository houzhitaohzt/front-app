/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-19 16:42
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import {Text} from '../../../components/ui';
import Search from './../../../elements/input/Search';
import {PagingList} from "../../../components/paging";
import Touchable from "../../../components/touchable";
import MIcon from 'react-native-vector-icons/MaterialIcons';



import {mainStyles} from '../../../styles/main.css';
import coreStyles from '../../../styles/core.css';
import styles from '../styles/ListSelect.css';
import selectStore, { SelectDefinition } from '../store/ListSelectStore';

type Props = {
    renderItem: (item: Object)=> Object,
    selectArgs ?: SelectDefinition,
    pagingArgs: Object,
    labelKey: string,
    subKey: string,
}

type ListProps = {
    labelKey: string,
    subKey: string,
}

@observer
export class ListSelect extends React.Component {
    props: ListProps;

    static defaultProps = {
        labelKey: 'localName',
    };

    itemSeparatorComponent = () => (
        <View style={{backgroundColor: '#fff'}}>
            <View style={styles.listLine}/>
        </View>
    );

    defaultItem = (item) => {
        let {labelKey, subKey} = this.props;
        if(subKey){
            return (
                <View style={styles.subView}>
                    <Text fontSize={16} numberOfLines={1} >{item[labelKey]}</Text>
                    <Text c2 numberOfLines={1}>{item[subKey]}</Text>
                </View>
            )
        }
        return (
            <Text fontSize={16} numberOfLines={1}>{item[labelKey]}</Text>
        )
    };

    renderItem = (props)=> (
        <SelectItem {...props} renderItem = {this.props.renderItem || this.defaultItem}/>
    );

    getItemLayout = (data, index)=> ({length: 50, offset: 51 * index, index});

    render() {
        let that = this;
        let {store, getItemLayout} = that.props;
        return (
            <PagingList
                getItemLayout={getItemLayout || that.getItemLayout}
                ItemSeparatorComponent={that.itemSeparatorComponent}
                paging={store.paging}
                renderItem={that.renderItem}
                initialNumToRender={15}
                onPress={store.onSelect}
                pagingArgs={store.searchArgs}
            />
        );
    }
}

const SelectItem = observer(({item, index, onPress, renderItem}) => (
    <Touchable onPress={onPress} index={index} style={styles.listItem}>
        <View style={[styles.checkView, item._select? {} : styles.nCheckView]}>
            <MIcon name='check' size={16} color='#fff'/>
        </View>
        <View style={{flex: 1}}>{ renderItem(item) }</View>
    </Touchable>
));

export default class extends React.Component {
    props: Props;
    constructor (props){
        super(props);
        this.store = selectStore.getStore(props.pagingArgs)
    }

    componentWillMount() {
        let {pagingArgs, selectArgs, singleArgs} = this.props;
        selectStore.init(selectArgs);
        this.store.init(pagingArgs, singleArgs);
    }

    componentWillUnmount() {
        selectStore.dispose();
    }

    render () {
        let store = this.store;
        let {
            labelKey, renderItem, subKey, placeholder
        } = this.props;
        return (
            <View style={mainStyles.container}>
                <Search
                    placeholder={placeholder || ''}
                    placeholderTextColor="#bbbbbb"
                    containerStyle={coreStyles.searchContainer}
                    inputStyle={coreStyles.searchInput}
                    defaultValue={store.searchArgs[store.singleArgs.searchName] || ''}
                    icon={{name: 'search', color: '#bbbbbb'}}
                    onSubmitEditing={store.onSearch}
                />
                <ListSelect
                    store={store}
                    labelKey={labelKey}
                    subKey={subKey}
                    renderItem={renderItem}
                />
            </View>
        )
    }
}

export function renderRight(state){
    return (
        <TouchableOpacity style={styles.topNavRight} onPress={selectStore.onSave}>
            <MIcon name="check" color="#fff" size={22}/>
            <Text color='#fff'>({selectStore.dataSize})</Text>
        </TouchableOpacity>
    )
}