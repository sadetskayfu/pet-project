
import { useMemo } from 'react'

const RUSSIAN_MONTHS = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
  ];

export const useMonths = () => {
	const months = useMemo(
		() =>
			RUSSIAN_MONTHS.map((month) => ({
				value: month,
				label: month,
			})),
		[]
	)

    return { months }
}
