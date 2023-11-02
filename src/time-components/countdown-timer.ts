import AdjustingIntervalTimer from './timer';
import formatDistance from 'date-fns/formatDistance';
import currentTime from './current-time-ms';
import formatSecond from './format-second';
import print from '../dom-components/print';

function printTime(dueDate: Date, div: Element | Node) {
    const timeBetween = formatDistance(dueDate, currentTime());
    console.log(timeBetween);

    print(div, `in ${timeBetween}`);
}

export default class TimerCountdown {
    private timer: AdjustingIntervalTimer;
    printTime: Function;
    constructor(dueDate: Date, div: Element | Node) {
        this.timer = new AdjustingIntervalTimer(
            () => {
                printTime(dueDate, div);
                console.log(formatSecond(currentTime()));
            },
            1000,
            () => {
                console.log('Error');
            }
        );
    }
    public startTimerCountdown() {
        this.timer.start();
    }
    public stopTimerCountdown() {
        this.timer.stop();
    }
}
