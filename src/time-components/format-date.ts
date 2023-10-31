import { format } from 'date-fns';

export default function formatDate(date: number) {
    const formatBigEndian = format(date, 'yyyy-MM-dd');
    return formatBigEndian;
}
