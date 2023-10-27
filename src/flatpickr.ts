import flatpickr from 'flatpickr';
import currentTime from './current-time';
import startTimer from './duedate-timer';

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
        onOpen: function () {
            console.log(1);
            console.log(div);
        },
        onChange: function (date) {
            let selection = date[0];
            console.log(1);
            startTimer(selection, div);
        },
        mode: 'single',
        minDate: 'today',
    });
    return fp;
}
