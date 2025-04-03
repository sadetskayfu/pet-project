import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { TextAreaProps, TextArea } from '../../TextArea'

interface Props<T extends FieldValues> extends Omit<TextAreaProps, 'onChange'> {
    name: Path<T>
}

export const RHFTextArea = <T extends FieldValues>(props: Props<T>) => {
    const {
        name,
        helperText,
        onBlur: externalOnBlur,
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
                <TextArea
                    onBlur={mergeEventHandlers(onBlur, externalOnBlur)}
                    onChange={onChange}
                    errored={!!error}
                    helperText={error ? error?.message : helperText}
                    {...otherFieldProps}
                    {...otherProps}
                />
            )}
        />
    )
}
