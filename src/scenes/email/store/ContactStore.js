/**
 *
 * @flow
 * @author tangzehua
 * @sine 2017-09-22 16:47
 */
import {Actions} from 'react-native-router-flux';
import {observable, action, computed} from 'mobx';
import xt, {Api} from '../../../extension';

export const ContactConst = {
    //最近联系人
    lately: {
        pagingArgs: {
            host: Api.DS,
            uniqueKey: 'email',
            uri: '/emailContact/app/getRecentContacts'
        },
        labelKey: 'email'
    },
    //内部联系人
    inside: {
        pagingArgs: {
            host: Api.ES,
            uniqueKey: 'email',
            uri: '/staff/searchAppStaffsMailList'
        },
        singleArgs: {
            searchName: 'keyWord',
        },
        getItemLayout: (data, index)=> ({length: 70, offset: 71 * index, index}),
    },
    //外部联系人
    outside: {
        pagingArgs: {
            host: Api.DS,
            uniqueKey: 'email',
            uri: '/emailContact/app/getOutContacts'
        },
        labelKey: 'name',
        subKey: 'email'
    }
};

export class ContactStore {


}

export default new ContactStore();