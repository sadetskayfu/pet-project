export const getMinutesText = (minutes: number) => {
    const lastDigit = minutes % 10;
    const lastTwoDigits = minutes % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return `${minutes} minutes`;
    }

    switch (lastDigit) {
        case 1:
            return `${minutes} minute`;
        case 2:
        case 3:
        case 4:
            return `${minutes} minutes`;
        default:
            return `${minutes} minutes`;
    }
}