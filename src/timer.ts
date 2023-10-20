import currentTime from './current-time';
import formatSecond from './format-second';

export default function timer() {
    const interval = 1000; //1000ms
    let expectedTime = currentTime() + interval;
    setTimeout(step, interval);
    function step() {
        const drift = currentTime() - expectedTime;
        if (drift > interval) {
            console.log('drift error');
        }
        expectedTime += interval;
        setTimeout(step, Math.max(0, interval - drift));
        console.log(formatSecond(currentTime()));
    }
}
