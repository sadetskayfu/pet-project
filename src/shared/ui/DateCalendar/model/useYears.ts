import { useMemo } from 'react'

const getYears = (minYear: number, maxYear: number) => {
	const years = []

	for (let year = minYear; year <= maxYear; year++) {
		years.push(String(year))
	}
	return years.reverse()
}

export const useYears = (minYear: number, maxYear: number) => {
	const years = useMemo(
		() => getYears(minYear, maxYear),
		[minYear, maxYear]
	)

	return { years }
}
