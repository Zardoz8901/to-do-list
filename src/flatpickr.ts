import flatpickr from 'flatpickr';
import currentTime from './current-time';
import { CountdownManager } from './countdown-manager';

export const datePicker = (div: Element, currentCountdown: CountdownManager) => {
    const config = {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: currentTime(),
        weekNumbers: true,
    };
    const fp = flatpickr('.date-picker', {
        ...config,
        onOpen: function () {
            if (currentCountdown) {
                console.log('DatePicker opened. Attempting to stop countdown.');
                currentCountdown.stop();
            }
        },
        onClose: function (date) {
            let selection = date[0];
            currentCountdown.setCountdown(selection, div);
            currentCountdown.start();
        },
        mode: 'single',
        minDate: 'today',
    });
    return fp;
};
