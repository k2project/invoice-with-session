//Wed: May 8, 2020
export const dateUX = (date) => {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    date = new Date(date).toLocaleDateString('en-US', options);
    return date.slice(0, 3) + ':' + date.slice(4);
};
//add zero to single digit
export const dayFormating = (day) => (String(day).length > 1 ? day : '0' + day);
export const monthFormating = (month) =>
    String(month).length > 1 ? month : '0' + month;
//format:DD/MM/YYYY
export const date_DD_MM_YYYY = (date) => {
    date = new Date(date);
    let month = String(date.getMonth() + 1);
    month = monthFormating(month);
    let day = String(date.getDate());
    day = dayFormating(day);
    let year = date.getFullYear();

    return day + '/' + month + '/' + year;
    // return date.slice(0, 11).replace(/-/g, '/');
};
//format:YYYY-MM
export const date_YYYY_MM = (date) => {
    date = new Date(date);
    let month = String(date.getMonth() + 1);
    month = month.length > 1 ? month : '0' + month;
    return date.getFullYear() + '-' + month;
};
export const isToday = (d) => {
    d = new Date(d);
    const today = new Date();
    return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
    );
};
const getTime = (d) => {
    d = new Date(d);
    let hr = d.getHours();
    let min = d.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }
    var ampm = 'am';
    if (hr > 12) {
        hr -= 12;
        ampm = 'pm';
    }
    return hr + ':' + min + ampm;
};
const msPassedToday = () => {
    const t = new Date();
    return (
        t.getMilliseconds() +
        t.getSeconds() * 1000 +
        t.getMinutes() * 6e4 +
        t.getHours() * 3.6e6
    );
};
const wasYesterday = (date) => {
    const msInADay = 8.64e7;
    const msToday = +msPassedToday();
    date = new Date(date).getTime();
    const today = new Date().getTime();
    return date > today - msToday - msInADay && date < today - msToday;
};
export const getDateAndTimeUX = (date) => {
    const t = getTime(date);
    if (isToday(date)) return ' today at ' + t;
    if (wasYesterday(date)) return ' yesterday at ' + t;
    return ' on ' + dateUX(date) + ' at ' + t;
};
// (int) The current year
export const THIS_YEAR = +new Date().getFullYear();

// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH = +new Date().getMonth() + 1;

export const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const DAYS_OF_THE_WEEK = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
];
export const MONTHS = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];
