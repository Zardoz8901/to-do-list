import './style.css';
import currentDate from './current-date';
import currentTime from './current-time';
import countDown from './timer';
import formatSecond from './format-second';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import print from './print';
import createDiv from './create-div';
import flatpickr from './flatpickr';

const calendarNodeArray = document.querySelectorAll('.date-picker');
const divNodeArray = document.querySelectorAll('.date-text');

divNodeArray.forEach((div) => {
    div.addEventListener('click', () => {
        console.log(div);
        const calendar = flatpickr(div);
        return calendar;
    });
});

// const div1 = document.querySelector('#dt1');

// const calendar = flatpickr(div1);

// calendar;

// const dueDate = countDown;

//countDown(/*new Date(2023, 9, 23, 11, 22)*/);
