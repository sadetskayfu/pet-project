import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { Autocomplete, AutocompleteProps } from '../../Autocomplete'
import { Option } from '../types/Option'
import { useMemo } from 'react'

interface Props<T extends FieldValues, M extends boolean = false> extends AutocompleteProps<Option, M> {
    name: Path<T>
    options: Option[]
}

export const RHFAutocompleteByValue = <T extends FieldValues, M extends boolean = false>(props: Props<T, M>) => {
    const {
        name,
        helperText,
        options,
        onBlur: externalOnBlur,
        multiple,
        ...otherProps
    } = props

    const { control } = useFormContext()

    const recordOptions = useMemo(() => {
        const opt: Record<string, Option> = {}

        options.forEach((option) => {
            opt[option.value] = option
        })

        return opt
    }, [options])

    return (
        <Controller
            control={control}
            name={name}
            render={({
                field: { value, onBlur, onChange, ref, ...otherFieldProps },
                fieldState: { error },
            }) => (
                <Autocomplete
                    // @ts-ignore
                    inputRef={ref}
                    value={multiple ? value.map((v: string) => recordOptions[v]) : recordOptions[value]}
                    onChange={(value) => {
                        let newValue: string | string[]

                        if(multiple) {
                            newValue = (value as Option[]).map(v => v.value)
                        } else {
                            newValue = (value as Option | null)?.value || ''
                        }

                        onChange(newValue)
                    }}
                    onBlur={mergeEventHandlers(onBlur, externalOnBlur)}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    errored={!!error}
                    helperText={error ? error?.message : helperText}
                    options={options}
                    multiple={multiple}
                    {...otherFieldProps}
                    {...otherProps}
                />
            )}
        />
    )
}
