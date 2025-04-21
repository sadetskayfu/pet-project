import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { TextField, TextFieldProps } from '@/shared/ui/TextField'

interface Props<T extends FieldValues> extends TextFieldProps {
	name: Path<T>
	trim?: boolean
}

export const RHFTextField = <T extends FieldValues>(props: Props<T>) => {
	const {
		name,
		helperText,
		onBlur: externalOnBlur,
        clearButton,
		trim,
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
					onBlur={mergeEventHandlers([onBlur, externalOnBlur])}
                    onChange={(event) => {
						const value = event.target.value
						onChange(trim ? value.trim() : value)
					}}
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
