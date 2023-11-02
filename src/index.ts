import './style.css';
import { CountdownManager } from './time-components/countdown-manager';
import { datePicker } from './time-components/flatpickr';
import prioritySlider from './priority-slider';
import print from './print';
import currentDate from './time-components/current-date';

const divNodeArray = document.querySelectorAll('.date-text');

divNodeArray.forEach((div) => {
    const currentCountdown = new CountdownManager();
    div.addEventListener('click', () => {
        const timestamp = div.parentElement.parentElement.querySelector('.timestamp');
        print(timestamp, `${currentDate()}`);
        const calendar = datePicker(div, currentCountdown);
        return calendar;
    });
});

prioritySlider();
