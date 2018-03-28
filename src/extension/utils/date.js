/**
 * @flow
 */

import moment from 'moment';

const defaultCalendar = {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    lastDay: '[昨天]LT',
    //上周下周.不做
    // lastWeek: '[上]ddddLT',
    // nextWeek: '[下]ddddLT',
    week: "dddd",
    month: 'MM-DD',
    year: "YYYY-MM-DD"
};

export default class date {

    static formatCalendarNow(ft, options = {}) {
        options = Object.assign({}, defaultCalendar, options);
        let myMoment = moment(ft), now = moment();

        let format = !myMoment.isSame(now, 'year') ? 'year' :
            myMoment.isSame(now, 'week') ? (
                myMoment.isSame(now, 'day') ? 'sameDay' :
                    myMoment.isSame(moment().add(1, 'days'), 'day') ? 'nextDay' :
                        myMoment.isSame(moment().subtract(1, 'days'), 'day') ? 'lastDay' : 'week'
            ) : 'month';

        return myMoment.format(options[format]);
    }
}