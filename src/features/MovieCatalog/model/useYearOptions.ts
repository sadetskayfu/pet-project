import { useMemo } from 'react'

const getYears = (minYear: number, maxYear: number) => {
    const years = []

    for (let year = minYear; year <= maxYear; year++) {
        years.push(String(year))
    }
    return years.reverse()
}

export const useYearOptions = () => {
    const currentYear = new Date().getFullYear()

    const yearOptions = useMemo(
        () => getYears(1900, currentYear),
        [currentYear]
    )

    return { yearOptions }
}