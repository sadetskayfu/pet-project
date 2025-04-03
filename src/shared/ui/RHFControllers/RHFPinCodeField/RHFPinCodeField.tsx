import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { PinCodeField, PinCodeFieldProps } from '../../PinCodeField'

interface Props<T extends FieldValues> extends Omit<PinCodeFieldProps, 'value' | 'onChange'> {
    name: Path<T>
}

export const RHFPinCodeField = <T extends FieldValues>(props: Props<T>) => {
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
            // eslint-disable-next-line
            render={({ field : { ref, ...otherFieldProps }, fieldState: { error } }) => {
                return (
                    <PinCodeField
                        errored={!!error}
                        helperText={error ? error.message : helperText}
                        {...otherProps}
                        {...otherFieldProps}
                    />
                )
            }}
        />
    )
}
