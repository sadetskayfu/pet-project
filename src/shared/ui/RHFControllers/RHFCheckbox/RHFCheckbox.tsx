import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import {
	Checkbox,
	CheckboxProps as BaseCheckboxProps,
} from '@/shared/ui/Checkbox'
import { FormLabel, LabelPlacement } from '@/shared/ui/FormLabel'

type CheckboxProps = Omit<BaseCheckboxProps, 'name'>

interface Props<T extends FieldValues> extends CheckboxProps {
	name: Path<T>
	label?: string
	labelPlacement?: LabelPlacement
}

export const RHFCheckbox = <T extends FieldValues>(props: Props<T>) => {
	const {
		name,
		label,
		labelPlacement,
		onBlur: externalOnBlur,
		disabled,
		required,
		className,
		...otherProps
	} = props

	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onBlur, ...otherFieldProps } }) => {
				if (label) {
					return (
						<FormLabel
							className={className}
							label={label}
							disabled={disabled}
							required={required}
							labelPlacement={labelPlacement}
							control={
								<Checkbox
									onBlur={mergeEventHandlers(onBlur, externalOnBlur)}
									{...otherFieldProps}
									{...otherProps}
								/>
							}
						/>
					)
				} else {
					return (
						<Checkbox
							onBlur={mergeEventHandlers(onBlur, externalOnBlur)}
							className={className}
							disabled={disabled}
							required={required}
							{...otherFieldProps}
							{...otherProps}
						/>
					)
				}
			}}
		/>
	)
}
