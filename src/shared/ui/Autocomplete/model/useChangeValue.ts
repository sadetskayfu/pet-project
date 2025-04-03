import { useCallback, useEffect } from 'react'
import { hasSelectedValue } from './hasSelectedValue'
import { ValueType } from '../ui/Autocomplete'

type UseChangeValueProps<T, M extends boolean> = {
	valueRef: React.RefObject<ValueType<T, M>>
    inputValue: string
	onChange: (value: ValueType<T, M>) => void
    onChangeInputValue: (value: string) => void
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	getOptionValue: (option: T) => string
    getOptionLabel: (option: T) => string
	options: Record<string, T>
	freeSolo: boolean
}

export const useChangeValue = <T, M extends boolean>(
	props: UseChangeValueProps<T, M>
) => {
	const {
		valueRef,
        inputValue,
		onChange,
        onChangeInputValue,
		setIsOpen,
		getOptionValue,
        getOptionLabel,
		options,
		freeSolo,
	} = props

	const handleDelete = useCallback(
		(optionValue: string) => {
			const value = valueRef.current

			if (Array.isArray(value)) {
				const newValue = value.filter(
					(v) => getOptionValue(v) !== optionValue
				)

				onChange(newValue as ValueType<T, M>)
			} else {
				if(typeof value === 'string') {
					onChange('' as ValueType<T, M>)
				} else {
					onChange(null as ValueType<T, M>)
				}
                onChangeInputValue('')
			}
		},
		// eslint-disable-next-line
		[onChange, onChangeInputValue, valueRef]
	)

	const handleSelect = useCallback(
		(optionValue: string) => {
			const value = valueRef.current

			let isSelected: boolean = false
			const isOption = Boolean(options[optionValue])
			const isMulti = Array.isArray(value)

            if(hasSelectedValue(value)) {
                if (isMulti) {
                    isSelected = Boolean(value.find((v) => getOptionValue(v) === optionValue))
                } else {
                    isSelected = getOptionValue(value as T) === optionValue
                }
            }

			if (isSelected) {
				if(isOption) {
					handleDelete(optionValue)
				}
			} else {
				if (isMulti) {
                    const newValue = [...value, freeSolo ? optionValue : options[optionValue]]
					onChange(newValue as ValueType<T, M>)
				} else {					
					if(freeSolo) {
						const option = options[optionValue]
						const optionLabel = option ? getOptionLabel(option) : optionValue

						onChange(optionValue as ValueType<T, M>)
						onChangeInputValue(optionLabel)
					} else {
						onChange(options[optionValue] as ValueType<T, M>)
						onChangeInputValue(getOptionLabel(options[optionValue]))
					}
					setIsOpen(false)
				}
			}
		},
		// eslint-disable-next-line
		[handleDelete, onChange, setIsOpen, onChangeInputValue, options, valueRef, freeSolo]
	)

	const handleClick = useCallback(
		(event: React.MouseEvent) => {
			const option = (event.target as HTMLElement).closest(
				'li'
			) as HTMLLIElement | null

			if (!option) return

			const optionValue = option.getAttribute('data-value')

			if (optionValue) {
				handleSelect(optionValue)
			}
		},
		[handleSelect]
	)

	useEffect(() => {
		const value = valueRef.current

		if (
			!Array.isArray(value) &&
			value &&
			inputValue === ''
		) {
            if(typeof value === 'string') {
				onChange('' as ValueType<T, M>)
			} else {
				onChange(null as ValueType<T, M>)
			}
		}
	// eslint-disable-next-line
	}, [inputValue])

	return { handleSelect, handleDelete, handleClick }
}
