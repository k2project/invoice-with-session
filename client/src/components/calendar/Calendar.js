import React, { useState, useEffect } from 'react';
import './Calendar.scss';
import {
    DAYS,
    DAYS_LEAP,
    DAYS_OF_THE_WEEK,
    MONTHS,
    dayFormating,
    monthFormating,
} from './dates';

export function Calendar({ cb }) {
    const today = new Date();
    const today_day = today.getDate();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();

    const [date, setDate] = useState(today);
    const month = date.getMonth();
    const year = date.getFullYear();

    //get a number of days in month in regards to the leap year
    const isLeapYear = (year) => {
        return !(year % 4 || (!(year % 100) && year % 400));
    };
    const days_in_month = isLeapYear(year) ? DAYS_LEAP : DAYS;
    //calculate number of days to display before the first day of month
    const getStartDayOfMonth = () => {
        return new Date(year, month, 1).getDay();
    };
    const first_day = getStartDayOfMonth();
    const empty_days = first_day === 0 ? 6 : first_day - 1;
    const num_of_days_to_display = Array(
        days_in_month[date.getMonth()] + empty_days
    );

    return (
        <article className='calendar'>
            <div className='calendar__header'>
                {/* prev month */}
                <button
                    onClick={() => setDate(new Date(year, month - 1, 1))}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>&#x27A4;</span>
                </button>
                <div>
                    <b>
                        {MONTHS[month]} {year}
                    </b>
                </div>
                {/* next month */}
                <button
                    onClick={() => setDate(new Date(year, month + 1, 1))}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>&#x27A4;</span>
                </button>
            </div>
            <ul>
                {DAYS_OF_THE_WEEK.map((d) => (
                    <li key={'cal-day-names-' + d} className='day day__name'>
                        {d}
                    </li>
                ))}
            </ul>

            <ul>
                {num_of_days_to_display.fill(null).map((_, index) => {
                    let d = index - (empty_days - 1);
                    if (d < 1) return <li key={'calendar-day-' + index}></li>;
                    return (
                        <li className='day' key={'calendar-day-' + index}>
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() =>
                                    cb(
                                        `${dayFormating(d)}/${monthFormating(
                                            month + 1
                                        )}/${year}`
                                    )
                                }
                            >
                                <span
                                    className={
                                        d === today_day &&
                                        month === today_month &&
                                        year === today_year
                                            ? 'today'
                                            : ''
                                    }
                                >
                                    {d}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}
