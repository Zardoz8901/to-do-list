require('flatpickr/dist/themes/airbnb.css');
import flatpickr from 'flatpickr';
import currentTime from './current-time-ms';
import { CountdownManager } from './countdown-manager';
import print from '../dom-components/print';
import Timestamp from '../dom-components/print-timestamp';

export const datePicker = (div: Element | Node, currentCountdown: CountdownManager) => {
    let config = {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: currentTime(),
        minuteIncrement: 5,
        weekNumbers: true,
    };
    // initial date variable dictates timestamp creation and modification
    let initialDate: null | Date = null;
    const timestampPrinter = new Timestamp();
    const fp = flatpickr(div, {
        ...config,
        onOpen: function (date, dateStr, instance) {
            if (currentCountdown) {
                currentCountdown.stop();
            }
            // check if a date is already selected, otherwise use current date
            let currentDate = date[0] || new Date();
            // round minutes to the nearest 5
            let minutes = currentDate.getMinutes();
            let roundedMinutes = Math.ceil(minutes / 5) * 5;
            currentDate.setMinutes(roundedMinutes);
            // set the time in flatpickr instance
            instance.setDate(currentDate);
            initialDate = currentDate;
        },
        onClose: function (date) {
            let selection = date[0];
            print(div, 'pending');
            // flatpickr updates the time between at the half minute mark
            // this idiosyncracy can read as slippage but is probably a necessary evil
            currentCountdown.setCountdown(selection, div);
            // initiate timestamp creation if null or selection changes on close
            if (!initialDate || selection.getTime() !== initialDate.getTime()) {
                timestampPrinter.printStamp(div);
            }

            currentCountdown.start();
        },
        onChange(dateStr, dobjs, fp) {
            setTimeout(() => {
                const d = fp.latestSelectedDateObj;
                const mins = d.getMinutes();
                if (mins % 5) d.setMinutes(5 * Math.round(d.getMinutes() / 5));
                fp.setDate(d, false);
            }, 100);
            console.log(dateStr);
        },
        mode: 'single',
        minDate: 'today',
    });
    return fp;
};
