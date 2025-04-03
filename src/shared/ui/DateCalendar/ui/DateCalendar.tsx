import { Select } from '../../Select'
import { OptionItem } from '@/shared/ui/OptionItem'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { getMonth, getYear } from 'date-fns'
import { useYears } from '../model/useYears'
import { useMonths } from '../model/useMonths'
import { useCalendarDays } from '../model/useCalendarDays'
import { weekDays } from '../model/weekDays'
import { IconButton } from '@/shared/ui/IconButton'
import { Composite, CompositeItem } from '@floating-ui/react'
import { Typography } from '@/shared/ui/Typography'
import { parseValue } from '../model/parseValue'
import { getValue } from '../model/getValue'
import styles from './style.module.scss'

interface DateCalendarProps {
	value: string
	onChange: (value: string) => void
	onSelectDay?: () => void
	minYear?: number
	maxYear?: number
}

export const DateCalendar = memo((props: DateCalendarProps) => {
	const {
		value,
		onChange,
		onSelectDay,
		minYear = 1900,
		maxYear = getYear(new Date()),
	} = props

	const { years } = useYears(minYear, maxYear)
	const { months } = useMonths()

	const currentDate = new Date()

	const parsedValue = parseValue(value, maxYear, minYear)

	const [activeDayIndex, setActiveDayIndex] = useState<number | undefined>()

	const [selectedYear, setSelectedYear] = useState<string>(
		parsedValue ? parsedValue.year : getYear(currentDate) + ''
	)
	const [selectedMonth, setSelectedMonth] = useState<string>(
		parsedValue ? parsedValue.month : getMonth(currentDate) + 1 + ''
	)
	const [selectedDay, setSelectedDay] = useState<number | undefined>(
		parsedValue ? parsedValue.day : undefined
	)

	const { calendarDays, rows } = useCalendarDays(
		Number(selectedMonth),
		Number(selectedYear)
	)

	const handleChangeYear = useCallback((value: string | string[]) => {
		setSelectedYear(value as string)
	}, [])

	const handleChangeMonth = useCallback((value: string | string[]) => {
		setSelectedMonth(value as string)
	}, [])

	const handleChangeDay = useCallback(
		(day: number) => {
			setSelectedDay(day)
			onSelectDay?.()
			onChange(getValue(selectedMonth, day + '', selectedYear))
		},
		[onSelectDay, onChange, selectedMonth, selectedYear]
	)

	const renderYearOptions = useMemo(
		() =>
			years.map((year) => {
				return (
					<OptionItem
						key={year}
						value={year}
						centerContent
						selectVariant="bg"
					>
						{year}
					</OptionItem>
				)
			}),
		[years]
	)

	const renderMonthOptions = useMemo(
		() =>
			months.map((month) => {
				return (
					<OptionItem key={month.value} value={month.value} selectVariant="bg">
						{month.label}
					</OptionItem>
				)
			}),
		[months]
	)

	const renderWeekDays = useMemo(
		() =>
			weekDays.map((day) => {
				return (
					<Typography
						key={day.ariaLabel}
						className={styles['day-calendar__week-day']}
						component="span"
						role="columnheader"
						aria-label={day.ariaLabel}
					>
						{day.label}
					</Typography>
				)
			}),
		[]
	)

	const renderCalendarDays = useMemo(
		() =>
			rows.map((rowIndex) => {
				return (
					<div
						className={styles['day-calendar__week-container']}
						key={rowIndex}
						role="row"
						aria-rowindex={rowIndex + 1}
					>
						{calendarDays
							.slice(rowIndex * 7, (rowIndex + 1) * 7)
							.map((day, colIndex) => {
								const key = `${rowIndex}-${colIndex}`

								if (day) {
									const isSelected = day === selectedDay
									console.log('map')
									return (
										<CompositeItem
											key={key}
											render={({ tabIndex, ...otherProps }) => {
												let correctedTabIndex: number | undefined = tabIndex

												if (!activeDayIndex) {
													if (selectedDay) {
														if (isSelected) {
															correctedTabIndex = 0
														}
													} else {
														if (day === 1) {
															correctedTabIndex = 0
														}
													}
												}

												return (
													<IconButton
														{...otherProps}
														tabIndex={correctedTabIndex}
														onClick={() => handleChangeDay(day)}
														variant={isSelected ? 'filled' : 'clear'}
														color={isSelected ? 'primary' : 'secondary'}
														aria-selected={isSelected ? 'true' : 'false'}
														aria-colindex={colIndex + 1}
														size="xs"
														role="gridcell"
													>
														{day}
													</IconButton>
												)
											}}
										/>
									)
								} else {
									return (
										<CompositeItem
											key={key}
											disabled
											render={(props) => (
												<div
													{...props}
													tabIndex={-1}
													role="gridcell"
													onMouseDown={(event) => event.preventDefault()}
												></div>
											)}
										></CompositeItem>
									)
								}
							})}
					</div>
				)
			}),
		[calendarDays, selectedDay, rows, activeDayIndex, handleChangeDay]
	)

	useEffect(() => {
		if (selectedDay && !calendarDays.includes(selectedDay)) {
			setSelectedDay(1)
		}
	}, [calendarDays])

	useEffect(() => {
		setActiveDayIndex(undefined)
	}, [selectedYear, selectedMonth])

	useEffect(() => {
		if(parsedValue) {
			onChange(getValue(selectedMonth, selectedDay + '', selectedYear))
		}
	}, [selectedMonth, selectedYear])

	return (
		<div className={styles['calendar']}>
			<div className={styles['header']}>
				<Select
					label="Month"
					value={selectedMonth}
					onChange={handleChangeMonth}
					className={styles['select']}
					variant="outlined"
					size="m"
					options={months}
					getOptionLabel={(option) => option.label}
					getOptionValue={(option) => option.value}
					hiddenLabel
					required
					fullWidth
					menuProps={{
						offset: 5,
						height: 280,
					}}
				>
					{renderMonthOptions}
				</Select>
				<Select
					label="Year"
					value={selectedYear}
					onChange={handleChangeYear}
					className={styles['year-select']}
					variant="outlined"
					size="m"
					options={years}
					hiddenLabel
					required
					menuProps={{
						width: 285,
						height: 280,
						cols: 4,
						placement: 'bottom-end',
						offset: 5,
					}}
				>
					{renderYearOptions}
				</Select>
			</div>
			<div role="grid" className={styles['day-calendar']}>
				<div role="row" className={styles['day-calendar__header']}>
					{renderWeekDays}
				</div>
				<Composite
					activeIndex={activeDayIndex}
					onNavigate={setActiveDayIndex}
					role="rowgroup"
					cols={7}
					className={styles['day-calendar__month-container']}
				>
					{renderCalendarDays}
				</Composite>
			</div>
		</div>
	)
})
