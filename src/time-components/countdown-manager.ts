import TimerCountdown from './countdown-timer';

// manager class for timers
export class CountdownManager {
    // allow for null on instantiation, instantiate
    private countdown: TimerCountdown | null = null;

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
        if (this.countdown) {
            this.countdown.stopTimerCountdown();
        }
    }
}
