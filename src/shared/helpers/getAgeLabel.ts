import { differenceInYears, parseISO } from "date-fns";

export const getAgeLabel = (birthDateStr: string) => {
    const birthDate = parseISO(birthDateStr)
    const today = new Date()
    const age =  differenceInYears(today, birthDate)

    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${age} лет`;
    }
    if (lastDigit === 1) {
        return `${age} год`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${age} года`;
    }
    return `${age} лет`;
}