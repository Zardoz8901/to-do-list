import currentTime from './current-time-ms';

export default class AdjustingIntervalTimerClass {
    workFunction: Function;
    interval: number;
    errorFunction: Function;
    expected: number | undefined;
    timeout: NodeJS.Timeout | undefined;
    constructor(workFunction: Function, interval: number, errorFunction: Function) {
        this.workFunction = workFunction;
        this.interval = interval;
        this.errorFunction = errorFunction;
        this.expected = undefined;
        this.timeout = undefined;
    }
    public start() {
        this.expected = currentTime() + this.interval;
        this.timeout = setTimeout(this.step, this.interval);
    }
    public stop() {
        clearTimeout(this.timeout);
    }
    private step = () => {
        const drift = currentTime() - this.expected;
        if (drift > this.interval) {
            this.errorFunction();
        }
        this.workFunction();
        this.expected += this.interval;
        this.timeout = setTimeout(this.step.bind(this), Math.max(0, this.interval - drift));
    };
}
