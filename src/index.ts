import currentDate from './current-date';
import currentTime from './current-time';
import countDown from './timer';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

countDown(new Date(2023, 9, 20));
console.log(formatDistanceToNow(new Date(2023, 9, 20)));

console.log(currentDate());
