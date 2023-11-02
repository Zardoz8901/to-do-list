import { format } from 'date-fns';

export default function formatDate(date: number) {
    const humanReadable = format(date, 'PPp');
    return humanReadable;
}
