export const dateUX = (date) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    date = date || new Date();
    return date.toLocaleDateString('en-US', options);
};
const isToday = (d) => {
    d = new Date(d);
    const today = new Date();
    return (
        d.getDate() == today.getDate() &&
        d.getMonth() == today.getMonth() &&
        d.getFullYear() == today.getFullYear()
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
