export const getSeasonLabel = (duration: number): string => {
    if (!Number.isInteger(duration) || duration < 0) {
      return '';
    }
  
    const lastDigit = duration % 10;
    const lastTwoDigits = duration % 100;
  
    let seasonForm: string;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      seasonForm = 'сезонов';
    } else if (lastDigit === 1) {
      seasonForm = 'сезон';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      seasonForm = 'сезона';
    } else {
      seasonForm = 'сезонов';
    }
  
    return `${duration} ${seasonForm}`;
  };