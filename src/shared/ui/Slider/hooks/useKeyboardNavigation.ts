import { useCallback } from 'react'
import { ValueType } from '../ui/Slider/Slider'
import { getRangeValues } from '../helpers'

type UseKeyboardNavigationProps = {
	valueRef: React.RefObject<ValueType>
	activeThumbIndexRef: React.RefObject<number>
	step: number
	min: number
	max: number
	minRange: number
	onChange: (value: ValueType) => void
}

export const useKeyboardNavigation = (
	props: UseKeyboardNavigationProps
) => {
	const { valueRef, activeThumbIndexRef, step, min, max, minRange, onChange } =
		props

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			const value = valueRef.current

			switch (event.key) {
				case 'ArrowRight':
				case 'ArrowUp':
				case 'ArrowLeft':
				case 'ArrowDown':
					event.preventDefault()
					event.stopPropagation()
					
					const direction =
						event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 1 : -1
					const localStep = direction * step

					if (Array.isArray(value)) {
						const activeThumbIndex = activeThumbIndexRef.current
						const thumbValue = value[activeThumbIndex]

						const newValue =
							direction === 1
								? Math.min(thumbValue + localStep, max)
								: Math.max(thumbValue + localStep, min)

						const { newValues, correctedValue } = getRangeValues(
							value,
							newValue,
							activeThumbIndex,
							minRange,
							step
						)

						if (correctedValue !== thumbValue) {
							onChange(newValues)
						}
					} else {
						const newValue =
							direction === 1
								? Math.min(value + localStep, max)
								: Math.max(value + localStep, min)

						if (value !== newValue) {
							onChange(newValue)
						}
					}
					break
				case 'Home':
				case 'End':
					event.preventDefault()
					event.stopPropagation()

					const newValue = event.key === 'Home' ? min : max

					if (Array.isArray(value)) {
						const activeThumbIndex = activeThumbIndexRef.current

						const {newValues, correctedValue} = getRangeValues(
							value,
							newValue,
							activeThumbIndex,
							minRange,
							step
						)

						if(value[activeThumbIndex] !== correctedValue) {
							onChange(newValues)
						}
					} else {
						if (value !== newValue) {
							onChange(newValue)
						}
					}
					break
			}
		},
		[onChange, minRange, max, min, step, activeThumbIndexRef, valueRef]
	)

	return { handleKeyDown }
}
