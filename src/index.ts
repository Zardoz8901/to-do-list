import './style.css';
import { CountdownManager } from './time-components/countdown-manager';
import { datePicker } from './time-components/flatpickr';
import prioritySlider from './dom-components/priority-slider';
import instantiateToDo from './dom-components/instantiate-to-do';
import print from './dom-components/print';
import currentDate from './time-components/current-date';

const divNodeArray = document.querySelectorAll('.flatpickr');

divNodeArray.forEach((div) => {
    div.addEventListener('click', () => {
        const currentCountdown = new CountdownManager();
        const picker = div.parentElement;
        const calendar = datePicker(picker, currentCountdown);
        return calendar;
    });
});

instantiateToDo();
prioritySlider();
