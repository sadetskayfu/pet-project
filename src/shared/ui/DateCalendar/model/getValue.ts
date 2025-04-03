export const getValue = (month: string, day: string, year: string) => {
    const monthValue = month.length > 1 ? month : `0${month}`
    const dayValue = day.length > 1 ? day : `0${day}`

    return `${year}-${monthValue}-${dayValue}`
}