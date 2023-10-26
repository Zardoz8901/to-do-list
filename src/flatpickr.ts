import flatpickr from 'flatpickr';
import currentTime from './current-time';
import getTime from 'date-fns/getTime';
import countDown from './timer';

export default function flatpickrFormat(div: Element) {
    const config = {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: currentTime(),
        weekNumbers: true,
    };
    const fp = flatpickr('.date-picker', {
        ...config,
        onChange: function (date) {
            let selection = date[0];
            countDown(selection, div);
        },
        mode: 'single',
        minDate: 'today',
    });
    return fp;
}
