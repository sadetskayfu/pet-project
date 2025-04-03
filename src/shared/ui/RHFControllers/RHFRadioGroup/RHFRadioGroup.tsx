import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { FormLabel } from '@/shared/ui/FormLabel'
import { FormGroup, FormGroupProps as BaseFormGroupProps } from '@/shared/ui/FormGroup'
import { Option } from '../types/Option'
import { Radio, RadioSize, RadioVariant } from '@/shared/ui/Radio'

type FormGroupProps = Omit<BaseFormGroupProps, 'children'>

interface Props<T extends FieldValues> extends FormGroupProps {
    name: Path<T>
    label: string
    options: Option[]
    size?: RadioSize
    variant?: RadioVariant
    getDisabledOptions?: (value: string, index: number) => boolean
}

export const RHFRadioGroup = <T extends FieldValues>(props: Props<T>) => {
    const {
        name,
        label,
        options,
        helperText,
        orientation,
        size,
        variant,
        getDisabledOptions,
        ...otherProps
    } = props

    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({
                field: { onBlur, onChange, value, ref, name },
                fieldState: { error },
            }) => {
                return (
                    <FormGroup
                        label={label}
                        errored={!!error}
                        helperText={error ? error.message : helperText}
                        orientation={orientation}
                        {...otherProps}
                    >
                        {options.map((option, index) => (
                            <FormLabel
                                key={option.value}
                                label={option.label}
                                labelPlacement="right"
                                disabled={getDisabledOptions?.(option.value, index)}
                                control={
                                    <Radio
                                        ref={index === 0 ? ref : undefined}
                                        name={name}
                                        value={option.value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        checked={value === option.value}
                                        offset={
                                            orientation === 'vertical'
                                                ? 'left'
                                                : index === 0
                                                    ? 'left'
                                                    : undefined
                                        }
                                        size={size}
                                        variant={variant}
                                    />
                                }
                            />
                        ))}
                    </FormGroup>
                )
            }}
        />
    )
}
