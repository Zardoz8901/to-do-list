import './style.css';
import { CountdownManager } from './time-components/countdown-manager';
import { datePicker } from './time-components/flatpickr';
import prioritySlider from './priority-slider';

const divNodeArray = document.querySelectorAll('.date-text');

divNodeArray.forEach((div) => {
    const currentCountdown = new CountdownManager();
    div.addEventListener('click', () => {
        const calendar = datePicker(div, currentCountdown);
        return calendar;
    });
});

prioritySlider();
