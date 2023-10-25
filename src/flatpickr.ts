import flatpickr from 'flatpickr';
import currentTime from './current-time';

export default function flatpickrFormat() {
    const fp = flatpickr('.flatpickr', {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: currentTime(),
        weekNumbers: true,
    });
    return fp;
}
