import moment from 'moment';

export const isoStringToDateObjectWithoutOffset = date => {
    return moment(date, 'YYYY-MM-DD').toDate();
};

export const isoStringToString = date => {
    if (date) {
        return moment(date)
            .utc()
            .format('YYYY-MM-DD');
    }
    return moment()
        .utc()
        .format('YYYY-MM-DD');
};
