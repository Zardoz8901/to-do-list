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
        onOpen: function () {
            if (currentCountdown) {
                currentCountdown.stop();
            }
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
        onChange(dstr, dobjs, fp) {
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
