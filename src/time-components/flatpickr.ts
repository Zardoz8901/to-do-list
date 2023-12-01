require('flatpickr/dist/themes/airbnb.css');
import flatpickr from 'flatpickr';
import currentTime from './current-time-ms';
import { CountdownManager } from './countdown-manager';
import print from '../dom-components/print';
import formatSecond from './format-second';
import { format, setDate } from 'date-fns';

export const datePicker = (div: Element | Node, currentCountdown: CountdownManager) => {
    let config = {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: currentTime(),
        minuteIncrement: 5,
        weekNumbers: true,
    };
    const fp = flatpickr(div, {
        ...config,
        onOpen: function (date, dateStr, instance) {
            if (currentCountdown) {
                currentCountdown.stop();
            }
            // Check if a date is already selected, otherwise use current date
            let currentDate = date[0] || new Date();

            // Round minutes to the nearest 5
            let minutes = currentDate.getMinutes();
            let roundedMinutes = Math.ceil(minutes / 5) * 5;
            currentDate.setMinutes(roundedMinutes);

            // Set the time in flatpickr instance
            instance.setDate(currentDate);
        },
        onClose: function (date) {
            console.log(date);
            let selection = date[0];
            console.log(selection);
            // console.log(format)
            print(div, 'pending');
            currentCountdown.setCountdown(selection, div);
            currentCountdown.start();
        },
        onChange(dateStr, dobjs, fp) {
            setTimeout(() => {
                const d = fp.latestSelectedDateObj;
                const mins = d.getMinutes();

                if (mins % 5) d.setMinutes(5 * Math.round(d.getMinutes() / 5));

                fp.setDate(d, false);
            }, 100);
        },
        mode: 'single',
        minDate: 'today',
    });
    return fp;
};
