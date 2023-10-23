import currentDate from './current-date';
import currentTime from './current-time';
import countDown from './timer';
import formatSecond from './format-second';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import print from './print';
import createDiv from './create-div';

const body = document.body;
const firstDiv = createDiv();

body.appendChild(firstDiv);

// const dueDate = countDown;

//countDown(/*new Date(2023, 9, 23, 11, 22)*/);

let formatToSecond = formatSecond(currentTime());

const currentTimeString = countDown(new Date(2023, 9, 23, 16), firstDiv);

currentTimeString;
