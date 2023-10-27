import currentTime from './current-time';

// export default function countDown(dueDate: any, div: Element) {
//     const interval = 1000; //1000ms
//     let expectedTime = currentTime() + interval;
//     function step() {
//         const drift = currentTime() - expectedTime;
//         let timeBetween = formatDistance(dueDate, currentTime());
//         if (drift > interval) {
//             console.log('drift error');
//         }
//         expectedTime += interval;
//         setTimeout(step, Math.max(0, interval - drift));
//         console.log(formatSecond(currentTime()));
//         console.log(timeBetween);
//         div.textContent = timeBetween;
//     }
//     let timeout = setTimeout(step, interval);
//     return step();
// }

// export function AdjustingIntervalTimer(workFunc: Function, interval: number, errorFunc: Function) {
//     let that = this;
//     let expected: any, timeout: any;
//     this.interval = interval;

//     this.start = function () {
//         expected = currentTime() + this.interval;
//         timeout = setTimeout(step, this.interval);
//     };

//     this.stop = function () {
//         clearTimeout(timeout);
//     };

//     function step() {
//         let drift = currentTime() - expected;
//         if (drift > that.interval) {
//             // You could have some default stuff here too...
//             if (errorFunc) errorFunc();
//         }
//         workFunc();
//         expected += that.interval;
//         timeout = setTimeout(step, Math.max(0, that.interval - drift));
//     }
// }

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
    start(): void {
        this.expected = currentTime() + this.interval;
        this.timeout = setTimeout(this.step, this.interval);
    }
    stop(): void {
        clearTimeout(this.timeout);
    }
    private step = () => {
        const drift = currentTime() - this.expected;
        if (drift > this.interval) {
            this.errorFunction();
        }
        this.workFunction();
        console.log(2);
        this.expected += this.interval;
        this.timeout = setTimeout(this.step.bind(this), Math.max(0, this.interval - drift));
    };
}

//break down function into further modules
// break up timeBetween into "time" that handles each function uniquely; dependency inversion97            1
