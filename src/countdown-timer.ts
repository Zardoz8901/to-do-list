import AdjustingIntervalTimer from './timer';
import formatDistance from 'date-fns/formatDistance';
import currentTime from './current-time';

function printTime(dueDate: Date, div: Element) {
    const timeBetween = formatDistance(dueDate, currentTime());
    console.log(timeBetween);
    div.textContent = `in ${timeBetween}`;
}

export default class TimerCountdown {
    private timer: AdjustingIntervalTimer;
    printTime: Function;
    constructor(dueDate: Date, div: Element) {
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
        console.log('logging third level');
        this.timer.stop();
    }
}
