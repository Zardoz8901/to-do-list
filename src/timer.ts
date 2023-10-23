import { formatDistance } from 'date-fns';
import currentTime from './current-time';
import formatSecond from './format-second';
import print from './print';

export default function countDown(endTime: any, div: HTMLElement) {
    const interval = 1000; //1000ms
    let expectedTime = currentTime() + interval;
    function step() {
        const drift = currentTime() - expectedTime;
        if (drift > interval) {
            console.log('drift error');
        }
        const timeBetween = formatDistance(endTime, currentTime());
        expectedTime += interval;
        setTimeout(step, Math.max(0, interval - drift));
        let now = currentTime();
        div.textContent = `in ${timeBetween}`;
        let printNow = print(now.toString);
        return now;
    }
    setTimeout(step, interval);
    return step();
}
