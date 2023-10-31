import flatpickr from 'flatpickr';
import currentTime from './current-time-ms';
import { CountdownManager } from './countdown-manager';
import formatSecond from './format-second';
import { format, setDate } from 'date-fns';

export const datePicker = (div: Element, currentCountdown: CountdownManager) => {
    let config = {
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
                currentCountdown.stop();
            }
        },
        onClose: function (date) {
            console.log(date);
            let selection = date[0];
            console.log(selection);
            currentCountdown.setCountdown(selection, div);
            currentCountdown.start();
        },
        mode: 'single',
        minDate: 'today',
    });
    return fp;
};
