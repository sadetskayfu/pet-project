import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { DatePicker, DatePickerProps } from '@/shared/ui/DatePicker/ui/DatePicker'

interface Props<T extends FieldValues> extends DatePickerProps {
	name: Path<T>
}

export const RHFDatePicker = <T extends FieldValues>(props: Props<T>) => {
	const {
		name,
		helperText,
		...otherProps
	} = props

	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, value, ref, disabled },
				fieldState: { error },
			}) => (
				<DatePicker
                    ref={ref}
                    value={value}
                    onChange={onChange}
					errored={!!error}
					helperText={error ? error?.message : helperText}
					disabled={disabled}
					{...otherProps}
				/>
			)}
		/>
	)
}
