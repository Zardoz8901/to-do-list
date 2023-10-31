import './style.css';
import { CountdownManager } from './countdown-manager';
import { datePicker } from './flatpickr';

const divNodeArray = document.querySelectorAll('.date-text');

divNodeArray.forEach((div) => {
    const currentCountdown = new CountdownManager();
    div.addEventListener('click', () => {
        console.log(div);
        const calendar = datePicker(div, currentCountdown);
        return calendar;
    });
});
