
import { format } from 'date-fns'
import { useMemo } from 'react'
import { ru } from 'date-fns/locale';

export const useMonths = () => {
	const monthsArray = useMemo(
		() => Array.from({ length: 12 }, (_, i) => i + 1),
		[]
	)

	const months = useMemo(
		() =>
			monthsArray.map((month) => ({
				value: month + '',
				label: format(new Date(2023, month - 1, 1), 'MMMM', { locale: ru }),
			})),
		[monthsArray]
	)

    return { months }
}
