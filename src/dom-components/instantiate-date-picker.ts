import { CountdownManager } from '../time-components/countdown-manager';
import { datePicker } from '../time-components/flatpickr';

export default function instantiateDatePicker() {
    const divNodeArray = document.querySelectorAll('.flatpickr');

    divNodeArray.forEach((div) => {
        div.addEventListener('click', () => {
            const currentCountdown = new CountdownManager();
            const picker = div.parentElement;
            const calendar = datePicker(picker, currentCountdown);
            return calendar;
        });
    });
}
