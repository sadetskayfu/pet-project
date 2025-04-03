import { cloneElement, ReactElement, useId } from 'react'
import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import { Label } from '@/shared/ui/Label'
import { useFormGroupContext } from '@/shared/ui/FormGroup'
import styles from './style.module.scss'

export type LabelPlacement = 'right' | 'left' | 'top' | 'bottom'

export interface FormLabelProps {
	className?: string
	control: ReactElement
	label: string
	required?: boolean
	disabled?: boolean
	labelPlacement?: LabelPlacement
}

export const FormLabel = (props: FormLabelProps) => {
	const {
		className,
		control,
		label,
		required,
		disabled,
		labelPlacement = 'right',
	} = props

	const context = useFormGroupContext()

	const labelId = useId()

	const isDisabled = context?.disabled || disabled

	const additionalClasses: AdditionalClasses = [
		className,
		styles[labelPlacement],
	]

	const mods: Mods = {
		[styles['required']]: required,
		[styles['disabled']]: isDisabled,
	}

	return (
		<label
			className={classNames(styles['label-wrapper'], additionalClasses, mods)}
		>
			{/* @ts-ignore */}
			{cloneElement(control, { labelId, required, disabled: isDisabled })}
			<Label
				color="hard"
				disabled={disabled}
				required={required}
				component="span"
				id={labelId}
			>
				{label}
			</Label>
		</label>
	)
}
