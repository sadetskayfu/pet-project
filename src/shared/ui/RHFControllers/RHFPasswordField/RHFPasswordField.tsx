import { Controller, FieldValues, useFormContext, Path } from "react-hook-form"
import { mergeEventHandlers } from "@/shared/helpers/mergeEventHandlers"
import { TextFieldProps } from "@/shared/ui/TextField"
import { PasswordField } from "../../PasswordField"

interface Props<T extends FieldValues> extends TextFieldProps {
	name: Path<T>
	trim?: boolean
}

export const RHFPasswordField = <T extends FieldValues>(props: Props<T>) => {
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
				<PasswordField
					onBlur={mergeEventHandlers([onBlur, externalOnBlur])}
					onChange={(event) => {
						const value = event.target.value
						onChange(trim ? value.trim() : value)
					}}
					onClear={clearButton ? () => onChange("") : undefined}
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
