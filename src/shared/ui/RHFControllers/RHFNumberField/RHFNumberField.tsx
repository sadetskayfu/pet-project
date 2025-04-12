import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { NumberField, NumberFieldProps } from '@/shared/ui/NumberField'

interface Props<T extends FieldValues> extends NumberFieldProps {
	name: Path<T>
}

export const RHFNumberField = <T extends FieldValues>(props: Props<T>) => {
	const {
		name,
		helperText,
		onBlur: externalOnBlur,
        clearButton,
		...otherProps
	} = props

	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onBlur, ...otherFieldProps },
				fieldState: { error },
			}) => (
				<NumberField
					onBlur={mergeEventHandlers([onBlur, externalOnBlur])}
                    clearButton={clearButton}
					errored={!!error}
					helperText={error ? error?.message : helperText}
                    {...otherFieldProps}
					{...otherProps}
				/>
			)}
		/>
	)
}
