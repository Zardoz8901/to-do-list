import './style.css';
import currentDate from './current-date';
import currentTime from './current-time';
import countDown from './timer';
import formatSecond from './format-second';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import print from './print';
import createDiv from './create-div';
import flatpickr from './flatpickr';

function queryCal() {
    const calendar = flatpickr(secondDiv);
    const calendar2 = flatpickr(firstDiv);
    calendar;
    calendar2;
}

const firstDiv = document.querySelector('#first-div');

const secondDiv = document.querySelector('#second-div');

queryCal();

// const dueDate = countDown;

//countDown(/*new Date(2023, 9, 23, 11, 22)*/);
