import { memo, ReactNode, useCallback, useEffect, useId, useRef } from 'react'
import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import { isValueSelected } from '@/shared/helpers/isValueSelected'
import { Typography } from '@/shared/ui/Typography'
import { ToggleButtonGroupContext } from '../model/ToggleButtonGroupContext'
import { Label } from '@/shared/ui/Label'
import styles from './style.module.scss'

type ToggleButtonOrientation = 'horizontal' | 'vertical'

export interface ToggleButtonGroupProps {
	className?: string
	label: string
	children: ReactNode
	value: string | string[]
	orientation?: ToggleButtonOrientation
	errored?: boolean
	helperText?: string
	disabled?: boolean
	required?: boolean
	hiddenLabel?: boolean
	stack?: boolean
	onChange: (value: string | string[]) => void
}

export const ToggleButtonGroup = memo((props: ToggleButtonGroupProps) => {
	const {
		className,
		label,
		children,
		value: selectedValue,
		orientation = 'horizontal',
		helperText,
		disabled,
		required,
		hiddenLabel,
		stack = true,
		errored,
		onChange,
		...otherProps
	} = props

	const helperTextId = useId()
	const selectedValueRef = useRef<string | string[]>(selectedValue)

	const handleDelete = useCallback(
		(value: string) => {
			const selectedValue = selectedValueRef.current

			if (Array.isArray(selectedValue)) {
				if (selectedValue.length === 1 && required) return

				onChange(selectedValue.filter((v) => v !== value))
			} else {
				if (required) return

				onChange('')
			}
		},
		[onChange, required]
	)

	const handleChange = useCallback(
		(value: string) => {
			const selectedValue = selectedValueRef.current
			const isSelected = isValueSelected(value, selectedValue)

			if (isSelected) {
				handleDelete(value)
			} else {
				if (Array.isArray(selectedValue)) {
					onChange([...selectedValue, value])
				} else {
					onChange(value)
				}
			}
		},
		[handleDelete, onChange]
	)

	useEffect(() => {
		selectedValueRef.current = selectedValue
	}, [selectedValue])

	const additionalClasses: AdditionalClasses = [className, styles[orientation]]

	const mods: Mods = {
		[styles['stack']]: stack,
		[styles['errored']]: errored,
	}

	return (
		<fieldset
			className={classNames(styles['group'], additionalClasses, mods)}
			aria-invalid={errored ? 'true' : 'false'}
			aria-describedby={helperText ? helperTextId : undefined}
			aria-disabled={disabled ? 'true' : undefined}
			aria-required={required ? 'true' : 'false'}
			{...otherProps}
		>
			<Label
				component="legend"
				errored={errored}
				required={required}
				disabled={disabled}
				className={classNames(styles['label'], [
					hiddenLabel ? 'visually-hidden' : undefined,
				])}
			>
				{label}
			</Label>
			<div role="group" className={styles['button-group']}>
				<ToggleButtonGroupContext.Provider
					value={{ selectedValue, onChange: handleChange, disabled }}
				>
					{children}
				</ToggleButtonGroupContext.Provider>
			</div>
			{helperText && (
				<Typography
					role={errored ? 'alert' : undefined}
					component="p"
					size="helper"
					color={errored ? 'error' : 'soft'}
					id={helperTextId}
				>
					{helperText}
				</Typography>
			)}
		</fieldset>
	)
})
