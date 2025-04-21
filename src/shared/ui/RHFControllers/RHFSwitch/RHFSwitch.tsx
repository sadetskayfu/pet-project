import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { Switch, SwitchProps } from '@/shared/ui/Switch'
import { FormLabel, LabelPlacement } from '@/shared/ui/FormLabel'

interface Props<T extends FieldValues> extends SwitchProps {
	name: Path<T>
	label?: string
	labelPlacement?: LabelPlacement
}

export const RHFSwitch = <T extends FieldValues>(props: Props<T>) => {
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
			render={({ field: { value, onBlur, ...otherFieldProps } }) => {
				if (label) {
					return (
						<FormLabel
							className={className}
							label={label}
							disabled={disabled}
							required={required}
							labelPlacement={labelPlacement}
							control={
								<Switch
									onBlur={mergeEventHandlers([onBlur, externalOnBlur])}
									defaultChecked={value}
									{...otherFieldProps}
									{...otherProps}
								/>
							}
						/>
					)
				} else {
					return (
						<Switch
							onBlur={mergeEventHandlers([onBlur, externalOnBlur])}
							className={className}
							disabled={disabled}
							required={required}
							defaultChecked={value}
							{...otherFieldProps}
							{...otherProps}
						/>
					)
				}
			}}
		/>
	)
}
