import {
	HTMLAttributes,
	ReactElement,
	useId,
} from 'react'
import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames/classNames'
import { Typography } from '@/shared/ui/Typography'
import { Label } from '@/shared/ui/Label'
import { FormGroupContext } from '../model/FormGroupContext'
import styles from './style.module.scss'

type FormGroupOrientation = 'horizontal' | 'vertical'

export interface FormGroupProps extends HTMLAttributes<HTMLFieldSetElement> {
	className?: string
	children: ReactElement[]
	label: string
	helperText?: string
	orientation?: FormGroupOrientation
	errored?: boolean
	required?: boolean
	disabled?: boolean
	hiddenLabel?: boolean
}

export const FormGroup = (props: FormGroupProps) => {
	const {
		className,
		children,
		label,
		helperText,
		orientation = 'horizontal',
		errored,
		required,
		disabled,
		hiddenLabel,
		...otherProps
	} = props

	const helperTextId = useId()

	const additionalClasses: AdditionalClasses = [className, styles[orientation]]

	const mods: Mods = {
		[styles['errored']]: errored,
	}

	return (
		<fieldset
			className={classNames(styles['form-group'], additionalClasses, mods)}
			aria-required={required ? 'true' : 'false'}
			aria-disabled={disabled ? 'true' : undefined}
			aria-describedby={helperText ? helperTextId : undefined}
			aria-invalid={errored ? 'true' : 'false'}
			{...otherProps}
		>
			<Label
				className={classNames(styles['label'], [
					hiddenLabel ? 'visually-hidden' : undefined,
				])}
				component="legend"
				errored={errored}
				required={required}
				disabled={disabled}
			>
				{label}
			</Label>
			<div role="group" className={styles['item-group']}>
				<FormGroupContext.Provider value={{ disabled }}>
					{children}
				</FormGroupContext.Provider>
			</div>
			{helperText && (
				<Typography
					role={errored ? 'alert' : undefined}
					color={errored ? 'error' : 'soft'}
					size="helper"
					id={helperTextId}
				>
					{helperText}
				</Typography>
			)}
		</fieldset>
	)
}
