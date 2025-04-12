import { differenceInSeconds, formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale';

export const getPostTimeLabel = (isoDate: string) => {
    const date = new Date(isoDate);

    const secondsDiff = differenceInSeconds(new Date(), date);

    if (secondsDiff < 60) {
      return 'только что';
    }

    return formatDistanceToNow(date, { 
      addSuffix: true,
      locale: ru
    });
  }