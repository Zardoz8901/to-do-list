import { formatDistance } from 'date-fns';
import currentTime from './current-time';
import formatSecond from './format-second';
import print from './print';

export default function countDown(dueDate: any, div: HTMLElement) {
    const interval = 1000; //1000ms
    let expectedTime = currentTime() + interval;
    function step() {
        const drift = currentTime() - expectedTime;
        const timeBetween = formatDistance(dueDate, currentTime());
        if (drift > interval) {
            console.log('drift error');
        }
        expectedTime += interval;
        setTimeout(step, Math.max(0, interval - drift));
        div.textContent = `in ${timeBetween}`;
    }
    setTimeout(step, interval);
    return step();
}

//break down function into further modules
// break up timeBetween into "time" that handles each function uniquely; dependency inversion97            1
