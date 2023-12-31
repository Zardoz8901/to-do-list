import AdjustingIntervalTimer from './timer';
import formatDistance from 'date-fns/formatDistance';
import currentTime from './current-time-ms';
import print from '../dom-components/print';

function printTime(dueDate: Date, div: Element | Node) {
    let timeBetween = `in ${formatDistance(dueDate, currentTime())}`;
    if (timeBetween == 'in less than a minute') {
        timeBetween = 'now';
    }
    print(div, timeBetween);
}

export default class TimerCountdown {
    private timer: AdjustingIntervalTimer;
    printTime: Function;
    constructor(dueDate: Date, div: Element | Node) {
        this.timer = new AdjustingIntervalTimer(
            () => {
                printTime(dueDate, div);
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
