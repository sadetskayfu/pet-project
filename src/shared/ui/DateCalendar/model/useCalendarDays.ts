import { getDay, getDaysInMonth } from 'date-fns'
import { useMemo } from 'react'

const getCalendarDays = (month: number, year: number) => {
	const firstDayOfMonth = new Date(year, month - 1, 1)
	const dayOfWeek = getDay(firstDayOfMonth) // 0 (воскресенье) – 6 (суббота)
	const daysInMonth = getDaysInMonth(firstDayOfMonth)

	const calendarDays = []
	// Добавляем пустые ячейки до первого дня
	for (let i = 0; i < dayOfWeek; i++) {
		calendarDays.push(null)
	}
	// Добавляем дни месяца
	for (let day = 1; day <= daysInMonth; day++) {
		calendarDays.push(day)
	}
	return calendarDays
}

export const useCalendarDays = (month: number, year: number) => {
	const calendarDays = useMemo(() => getCalendarDays(month, year), [month, year])

	const rows = useMemo(
		() => Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, i) => i),
		[calendarDays.length]
	)

	return { calendarDays, rows }
}
