import './style.css';
import currentDate from './current-date';
import currentTime from './current-time';
import countDown from './timer';
import formatSecond from './format-second';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import print from './print';
import createDiv from './create-div';
import flatpickr from './flatpickr';

const calendar = flatpickr;
const body = document.body;
const firstDiv = createDiv();
const secondDiv = createDiv();

function addClass() {
    const calClass = firstDiv.classList.add('flatpickr');
    return calClass;
}

addClass();

function queryCal() {
    const myCalendar = document.querySelector('.flatpickr');
    console.log(myCalendar);
    calendar;
    console.log(flatpickr());
}

body.appendChild(firstDiv);
body.appendChild(secondDiv);
queryCal();

// const dueDate = countDown;

//countDown(/*new Date(2023, 9, 23, 11, 22)*/);

let formatToSecond = formatSecond(currentTime());

const countdownTimeStringTwo = countDown(new Date(2023, 9, 25, 16, 25), secondDiv);

countdownTimeStringTwo;
