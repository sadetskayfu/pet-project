import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { TextField, TextFieldProps } from '../../TextField'
import { Search } from '@/shared/assets/icons'

interface SearchInputProps extends Omit<TextFieldProps, 'onChange'> {
	onChange: (value: string) => void
	debounceDelay?: number
}

export const SearchInput = memo((props: SearchInputProps) => {
	const {
		value: externalValue,
		onChange,
		debounceDelay = 500,
		...otherProps
	} = props

	const [value, setValue] = useState<string>(externalValue as string)

	const debounceTimeoutIdRef = useRef<NodeJS.Timeout | null>(null)

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (debounceTimeoutIdRef.current) {
				clearTimeout(debounceTimeoutIdRef.current)
			}

			const newValue = event.target.value

			setValue(newValue)

			debounceTimeoutIdRef.current = setTimeout(() => {
				onChange(newValue)
			}, debounceDelay)
		},
		[debounceDelay, onChange]
	)

	const handleClear = useCallback(() => {
		setValue('')
		onChange('')
	}, [onChange])

	useEffect(() => {
		return () => {
			if (debounceTimeoutIdRef.current) {
				clearTimeout(debounceTimeoutIdRef.current)
			}
		}
	}, [])

	return (
		<TextField
			startAdornment={<Search size="m" />}
			value={value}
			onChange={handleChange}
			onClear={handleClear}
			clearButton
			{...otherProps}
		/>
	)
})
