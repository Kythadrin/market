import { Dayjs } from 'dayjs';

export const formatDate = (date: Dayjs, hasTime: boolean = false): string => {
    const day = date.date().toString().padStart(2, '0');
    const month = (date.month() + 1).toString().padStart(2, '0');
    const year = date.year().toString();

    return `${day}.${month}.${year}${hasTime ? ' ' + date.format('HH:mm:ss') : ''}`;
};