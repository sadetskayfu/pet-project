import { isValid } from "date-fns"

export const parseValue = (value: string, maxYear: number, minYear: number) => {
    const date = new Date(value)

    if (!isValid(date)) {
        return
    }

    const year = date.getFullYear()

    if(year < minYear || year > maxYear) {
        return
    }

    return {
        day: date.getDate(),
        month: date.getMonth() + 1 + '',
        year: year + '',
    }
}