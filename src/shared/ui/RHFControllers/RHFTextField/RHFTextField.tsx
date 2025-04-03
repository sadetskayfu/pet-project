import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { TextField, TextFieldProps } from '@/shared/ui/TextField'

interface Props<T extends FieldValues> extends TextFieldProps {
	name: Path<T>
}

export const RHFTextField = <T extends FieldValues>(props: Props<T>) => {
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
				field: { onBlur, onChange, ...otherFieldProps },
				fieldState: { error },
			}) => (
				<TextField
					onBlur={mergeEventHandlers(onBlur, externalOnBlur)}
                    onChange={onChange}
                    onClear={clearButton ? () => onChange('') : undefined}
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
