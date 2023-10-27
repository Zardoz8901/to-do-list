import AdjustingIntervalTimer from './timer';
import formatDistance from 'date-fns/formatDistance';
import currentTime from './current-time';

// export default function dueDateTimer(dueDate: Date, div: Element) {
//     function work(dueDate: Date, div: Element) {
//         const timeBetween = formatDistance(dueDate, currentTime());
//         console.log(timeBetween);
//         div.textContent = timeBetween;
//     }
//     const error = function () {
//         console.warn('The drift exceeded the interval.');
//     };
//     const newTimer = new AdjustingIntervalTimer(work, 1000, error);
//     return newTimer.start();
// }

function work(dueDate: Date, div: Element) {
    const timeBetween = formatDistance(dueDate, currentTime());
    console.log(timeBetween);
    div.textContent = timeBetween;
}

export default function startTimer(dueDate: Date, div: Element) {
    const timer = new AdjustingIntervalTimer(
        () => {
            work(dueDate, div);
        },
        1000,
        () => {
            console.log('Error');
        }
    );
    timer.start();
}
