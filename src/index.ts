import './style.css';
import { CountdownManager } from './time-components/countdown-manager';
import { datePicker } from './time-components/flatpickr';

const divNodeArray = document.querySelectorAll('.date-text');
const calendarMap = new Map(); // map to store flatpickr instances

divNodeArray.forEach((div) => {
    const currentCountdown = new CountdownManager();
    div.addEventListener('click', () => {
        if (!calendarMap.has(div)) {
            console.log(div);
            const calendar = datePicker(div, currentCountdown);
            calendarMap.set(div, calendar);
        }
    });
});

// const secondDiv = divNodeArray[1];

// const calendarOnDiv = calendarMap.get(secondDiv);

// console.log(calendarOnDiv);

// if (calendarOnDiv) {
//     calendarOnDiv.changeMonth(1);
// } else {
//     console.error('No flatpickr instance found for the specified div.');
// }
