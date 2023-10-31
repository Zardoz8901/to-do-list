import currentTime from './current-time-ms';
import formatDate from './format-date';

export default function currentDate() {
    const currentDate = formatDate(currentTime());
    return currentDate;
}
