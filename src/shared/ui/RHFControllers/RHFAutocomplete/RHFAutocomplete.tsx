import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { Autocomplete, AutocompleteProps } from '../../Autocomplete'

interface Props<T extends FieldValues, O, M extends boolean = false> extends AutocompleteProps<O, M> {
    name: Path<T>
}

export const RHFAutocomplete = <T extends FieldValues, O, M extends boolean = false>(props: Props<T, O, M>) => {
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
                field: { onBlur, ref, ...otherFieldProps },
                fieldState: { error },
            }) => (
                <Autocomplete
                    // @ts-ignore
                    inputRef={ref}
                    onBlur={mergeEventHandlers(onBlur, externalOnBlur)}
                    errored={!!error}
                    helperText={error ? error?.message : helperText}
                    {...otherFieldProps}
                    {...otherProps}
                />
            )}
        />
    )
}
