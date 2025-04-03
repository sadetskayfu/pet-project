import { memo, useRef } from 'react'
import { TextField } from '@/shared/ui/TextField'
import { FormGroup, FormGroupProps } from '@/shared/ui/FormGroup'
import styles from './style.module.scss'

export interface PinCodeFieldProps extends Omit<FormGroupProps, 'onChange' | 'children'> {
	value: string[]
	onChange: (value: string[]) => void
	onValidate?: (value: string) => boolean
}

export const PinCodeField = memo((props: PinCodeFieldProps) => {
	const {
		value: values,
		onChange,
		onValidate,
		disabled,
		required,
		...otherProps
	} = props

	const inputRefs = useRef<Array<HTMLInputElement | null>>(
		Array(values.length).fill(null)
	)

	const handleValidate = (value: string) => {
		if (onValidate) {
			onValidate(value)
		} else {
			return /^[a-zA-Z0-9]?$/.test(value)
		}
	}

	const handleInput = (
		event: React.FormEvent<HTMLInputElement>,
		index: number
	) => {
		const target = event.target as HTMLInputElement
		target.value = target.value.toUpperCase()
		const value = target.value

		if (handleValidate(value)) {
			if (
				target.value !== '' &&
				index < values.length - 1 &&
				inputRefs.current[index + 1]
			) {
				inputRefs.current[index + 1]?.focus()
			}
			const newValues = [...values]
			newValues[index] = value.toUpperCase()

			onChange(newValues)
		}
	}

	const handleKeyDown = (
		index: number,
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === ' ') {
			event.preventDefault()
			return
		}
		if (event.key === 'Backspace' && index > 0 && values[index] === '') {
			const newValues = [...values]
			newValues[index - 1] = ''

			onChange(newValues)

			inputRefs.current[index - 1]?.focus()
		}
	}

	const fieldLabel = (index: number) => `Pin code character ${index + 1}`

	return (
		<FormGroup
			className={styles['pin-code-field']}
			disabled={disabled}
			required={required}
			{...otherProps}
		>
			{values.map((_, index) => {
				return (
					<TextField
						key={index}
						variant='outlined'
						className={styles['field']}
						size="m"
						value={values[index]}
						label={fieldLabel(index)}
						ref={(el) => {
							inputRefs.current[index] = el
						}}
						maxLength={1}
						onKeyDown={(event) => handleKeyDown(index, event)}
						onInput={(event) => handleInput(event, index)}
						disabled={disabled}
						required={required}
						hiddenLabel
					/>
				)
			})}
		</FormGroup>
	)
})
