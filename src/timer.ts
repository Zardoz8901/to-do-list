import { formatDistance, intervalToDuration } from 'date-fns';
import currentTime from './current-time';
import formatSecond from './format-second';
import print from './print';

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

export function AdjustingIntervalTimer(workFunc: Function, interval: number, errorFunc: Function) {
    let that = this;
    let expected: any, timeout: any;
    this.interval = interval;

    this.start = function () {
        expected = currentTime() + this.interval;
        timeout = setTimeout(step, this.interval);
    };

    this.stop = function () {
        clearTimeout(timeout);
    };

    function step() {
        let drift = currentTime() - expected;
        if (drift > that.interval) {
            // You could have some default stuff here too...
            if (errorFunc) errorFunc();
        }
        workFunc();
        expected += that.interval;
        timeout = setTimeout(step, Math.max(0, that.interval - drift));
    }
}

export class AdjustingIntervalTimerClass {
    workFunc: Function;
    interval: number;
    errorFunc: Function;
    constructor(workFunc: Function, interval: number, errorFunc: Function) {
        this.workFunc = workFunc;
        this.interval = interval;
        this.errorFunc = this.errorFunc;
    }
}

//break down function into further modules
// break up timeBetween into "time" that handles each function uniquely; dependency inversion97            1
