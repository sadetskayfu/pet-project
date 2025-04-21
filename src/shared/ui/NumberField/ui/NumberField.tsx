import { forwardRef, memo, useCallback, useMemo, useState } from 'react'
import { TextField, TextFieldProps } from '@/shared/ui/TextField'
import { IconButton } from '@/shared/ui/IconButton'
import { Minus, Plus } from '@/shared/assets/icons'

export interface NumberFieldProps extends Omit<TextFieldProps, 'onChange' | 'value' | 'defaultValue'> {
	min?: number
	max?: number
	step?: number
    defaultValue?: string
	value?: string
	onChange?: (value: string, event: any) => void
}

const pattern = /^-?[0-9]*$/

export const NumberField = memo(forwardRef((props: NumberFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
	const {
		min,
		max,
		step = 1,
		defaultValue,
		value: controlledValue,
		onChange: controlledOnChange,
		actions: externalActions = [],
		readOnly,
		...otherProps
	} = props

	const [uncontrolledValue, setUncontrolledValue] = useState<string>(
		defaultValue || '0'
	)

	const value = controlledValue ?? uncontrolledValue
	const onChange = controlledOnChange ?? setUncontrolledValue

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if(readOnly) return

			const inputValue = event.target.value

            if(!inputValue) {
                onChange('', event)
                return
            }

			if (!pattern.test(inputValue)) {
				return
			}

            const hasMinus = inputValue.startsWith('-')

            if(hasMinus && inputValue.length === 1) {
                onChange(inputValue, event)
                return
            }

			const numberInputValue = Number(inputValue)
			let newValue: number = numberInputValue

			if (min != null && numberInputValue < min) {
				newValue = min
			} else if (max != null && numberInputValue > max) {
				newValue = max
			}
         
			onChange(String(newValue), event)
		},
		[max, min, onChange, readOnly]
	)

	const incrementValue = useCallback(
		(event: any) => {
			const newValue = Number(value) + step
			onChange(String(max != null ? Math.min(newValue, max) : newValue), event)
		},
		[onChange, max, step, value]
	)

	const decrementValue = useCallback(
		(event: any) => {
            const currentValue = value
            let newValue: number

            if(currentValue === '-') {
                newValue = -step
            } else {
                newValue = Number(currentValue) - step
            }

			onChange(String(min != null ? Math.max(newValue, min) : newValue), event)
		},
		[onChange, min, step, value]
	)

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			switch (event.key) {
				case 'ArrowUp':
                    event.preventDefault()
					incrementValue(event)
					break
				case 'ArrowDown':
                    event.preventDefault()
					decrementValue(event)
					break
				default:
					break
			}
		},
		[decrementValue, incrementValue]
	)

	const actions = useMemo(
		() => [
			...externalActions,
			<IconButton tabIndex={-1} onClick={decrementValue} variant="clear" color="red">
				<Minus />
			</IconButton>,
			<IconButton tabIndex={-1} onClick={incrementValue} variant="clear" color="green">
				<Plus />
			</IconButton>,
		],
		[externalActions, decrementValue, incrementValue]
	)

	return (
		<TextField
            ref={ref}
			value={value}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			actions={actions}
			readOnly={readOnly}
			{...otherProps}
		/>
	)
}))
