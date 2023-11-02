import './style.css';
import { CountdownManager } from './time-components/countdown-manager';
import { datePicker } from './time-components/flatpickr';
import prioritySlider from './dom-components/priority-slider';
import print from './dom-components/print';
import currentDate from './time-components/current-date';

const divNodeArray = document.querySelectorAll('.flatpickr');

divNodeArray.forEach((div) => {
    const currentCountdown = new CountdownManager();
    div.addEventListener('click', () => {
        const timestamp = div.parentElement.parentElement.querySelector('.timestamp');
        print(timestamp, `${currentDate()}`);
        const picker = div.parentElement;
        const calendar = datePicker(picker, currentCountdown);
        return calendar;
    });
});

prioritySlider();
