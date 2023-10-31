import { format } from 'date-fns';

export default function formatSecond(date: number) {
    const formatDateAndTime = format(date, 'PPpp');
    return formatDateAndTime;
}
