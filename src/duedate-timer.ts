import AdjustingIntervalTimer from './timer';
import formatDistance from 'date-fns/formatDistance';
import currentTime from './current-time';

const work = (dueDate: Date, div: Element) => {
    const timeBetween = formatDistance(dueDate, currentTime());
    console.log(timeBetween);
    div.textContent = timeBetween;
};

const error = function () {
    console.warn('The drift exceeded the interval.');
};

const dueDateTimer: any = new AdjustingIntervalTimer(work, 1000, error);
