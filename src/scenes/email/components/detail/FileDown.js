/**
 *
 * @flow
 * @author houzhitao
 * @sine 2017-09-15 11:59
 */
import React from 'react';
import {View, StyleSheet, Text, Platform, TouchableOpacity, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native';
import DetailStore from '../../store/DetailStore';
import Icon from "react-native-vector-icons/FontAwesome";
import xt from "../../../../extension";
import {mainColors} from "../../../../styles/main.css"
import Button from '../../../../elements/buttons';
import styles from '../../styles/detail.css';
import RNFS from "react-native-fs";

const judgeType = (name) => {
    let FileArray = [
        {bgC: "#31205f", type: "file-archive-o", reg: /\.txt$/g},
        {bgC: "#0073e6", type: "file-word-o", reg: /\.(doc|docx)$/g},
        {bgC: "#078f41", type: "file-excel-o", reg: /\.(xls|xlsx)$/g},
        {bgC: "#13c2cc", type: "file-image-o", reg: /\.(png|jpg|jpeg)$/g},
        {bgC: "#fe6613", type: "file-pdf-o", reg: /\.(pdf|pdfx)$/g},
        {bgC: "#0efed6", type: "file-powerpoint-o", reg: /\.(ppt|pptx)$/g}
    ];
    for (var i = 0; i < FileArray.length; i++) {
        if (FileArray[i].reg.test(name)) {
            return FileArray[i];
            break;
        }
    }
    return FileArray[0];
};

const judgeSize = size => {
    let num = Math.round(size / 1024 / 1024 * 100) / 100;
    if (size >= 0 && size < 1024) return size + "b";
    if (num >= 0.0009765625 && num < 1) return Math.floor(num * 1024) + 'kb';
    if (num >= 1) return num + "M";
};


export default observer(props => {
    let {store} = props;
    return store.detailData && store.appurtenance ? (store.moreLess ?
        <AllFileDown store={store} appurtenance={store.appurtenance}/> :
        <SectionFileDown store={store} appurtenance={store.appurtenance}/>) :
        <View/>
})

/*
* 部分
* */
const SectionFileDown = observer(({store, appurtenance}) => (
    <View style={styles.fileContainer}>
        {
            appurtenance.map((e, i) => {
                if (i < 1) {
                    let ooo = judgeType(e.fileName);
                    if(e.isExist){
                       return <TouchableOpacity onPress={() => store.onFilePreview(e)} key={i} style={styles.fileSingle}>
                            <View style={[styles.fileIcon, {backgroundColor: ooo.bgC}]}>
                                <Icon name={ooo.type} size={20} color='#fff'/>
                            </View>
                            <View style={styles.fileSays}>
                                <Text style={styles.fileTitle}>{e.fileName}</Text>
                                <Text
                                    style={styles.fileSize}>{judgeSize(e.fileSize)}</Text>
                            </View>
                        </TouchableOpacity>
                    }else{
                        return <View style={styles.fileSingle} key={i}>
                                <View style={[styles.fileIcon, {backgroundColor: ooo.bgC}]}>
                                    <Icon name={ooo.type} size={20} color='#fff'/>
                                </View>
                                <View style={styles.fileSays}>
                                    <Text style={styles.fileTitle}>{e.fileName}</Text>
                                    <Text
                                        style={styles.fileSize}>{judgeSize(e.fileSize)}</Text>
                                </View>
                                <View style={styles.fileDown}>
                                     <TouchableOpacity onPress={() => store.onFileDown(e)}>
                                        <View style={styles.icons}>
                                            <Icon name='download' size={16} color='#4895EB'/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
                }
            })
        }
        {
            appurtenance.length > 1 ?
                <TouchableOpacity onPress={store.onMoreLess}>
                    <View style={styles.allFile}>
                        <Text>还有{appurtenance.length - 1}个附件</Text>
                        <Icon name='angle-down' size={20} style={{color: '#ccc', paddingRight: 18}}
                        />
                    </View></TouchableOpacity> : null
        }
    </View>
));

/*
* 全部
* */
const AllFileDown = observer(({store, appurtenance}) => (
    <View style={styles.fileContainer}>
        {
            appurtenance.map((e, i) => {
                let ooAll = judgeType(e.fileName);
                if(e.isExist){
                    return <TouchableOpacity onPress={() => store.onFilePreview(e)} key={i} style={styles.fileSingle}>
                        <View style={[styles.fileIcon, {backgroundColor: ooAll.bgC}]}>
                            <Icon name={ooAll.type} size={20} color='#fff' style={{textAlign: "center"}}/>
                        </View>
                        <View style={styles.fileSays}>
                            <Text style={styles.fileTitle}>{e.fileName || ""}</Text>
                            <Text
                                style={styles.fileSize}>{judgeSize(e.fileSize)}</Text>
                        </View>
                    </TouchableOpacity>
                }else{
                    return <View style={styles.fileSingle} key={i}>
                        <View style={[styles.fileIcon, {backgroundColor: ooAll.bgC}]}>
                            <Icon name={ooAll.type} size={20} color='#fff' style={{textAlign: "center"}}/>
                        </View>
                        <View style={styles.fileSays}>
                            <Text style={styles.fileTitle}>{e.fileName || ""}</Text>
                            <Text
                                style={styles.fileSize}>{judgeSize(e.fileSize)}</Text>
                        </View>
                        <View style={styles.fileDown}>
                            <TouchableOpacity onPress={() => store.onFileDown(e)}>
                                <View style={styles.icons}>
                                    <Icon name='download' size={16} color='#4895EB'/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            })
        }
        {
            appurtenance.length > 1 ?
                <TouchableOpacity onPress={store.onMoreLess}>
                    <View style={styles.allFile}>
                        <Text>收起{appurtenance.length - 1}个附件</Text>
                        {/*<Button backgroundColor="transparent" borderRadius={4} fontSize={12} title="收起"*/}
                        {/*color={mainColors.mainText}*/}
                        {/*buttonStyle={{*/}
                        {/*height: 30,*/}
                        {/*width: 66,*/}
                        {/*paddingHorizontal: 1,*/}
                        {/*borderWidth: 1,*/}
                        {/*borderColor: mainColors.mainLine*/}
                        {/*}}*/}
                        {/*containerViewStyle={{marginLeft: 1}}*/}
                        {/*/>*/}
                        <Icon name='angle-up' size={20} style={{color: '#ccc', paddingRight: 18}}/>
                    </View></TouchableOpacity> : null
        }
    </View>
));