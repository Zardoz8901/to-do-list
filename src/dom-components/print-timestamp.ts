import currentDate from '../time-components/current-date';
import print from './print';

function printTimestamp(div: Element | Node) {
    const timestamp = div.parentElement.querySelector('.timestamp');
    print(timestamp, `${currentDate()}`);
}

export default class Timestamp {
    printStamp: (div: Element | Node) => void;

    constructor() {
        this.printStamp = printTimestamp;
    }
}
