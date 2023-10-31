import TimerCountdown from './countdown-timer';

export class CountdownManager {
    private countdown: TimerCountdown | null = null;
    constructor() {
        this.stop = this.stop.bind(this);
    }
    setCountdown(dueDate: Date, div: Element) {
        if (this.countdown) {
            this.countdown.stopTimerCountdown();
        }
        this.countdown = new TimerCountdown(dueDate, div);
    }

    start() {
        if (this.countdown) {
            this.countdown.startTimerCountdown();
        }
    }

    stop() {
        console.log('logging second level');
        if (this.countdown) {
            this.countdown.stopTimerCountdown();
        }
    }
}
