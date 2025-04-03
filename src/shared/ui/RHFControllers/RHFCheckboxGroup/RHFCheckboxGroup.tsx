import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import {
	Checkbox,
	CheckboxSize,
	CheckboxVariant,
	CheckboxColor,
} from '@/shared/ui/Checkbox'
import { FormLabel } from '@/shared/ui/FormLabel'
import { FormGroup, FormGroupProps as BaseFormGroupProps } from '@/shared/ui/FormGroup'
import { Option } from '../types/Option'

type FormGroupProps = Omit<BaseFormGroupProps, 'children'>

interface Props<T extends FieldValues> extends FormGroupProps {
	name: Path<T>
	label: string
	options: Option[]
	size?: CheckboxSize
	variant?: CheckboxVariant
	color?: CheckboxColor
    getDisabledOptions?: (value: string, index: number) => boolean
}

export const RHFCheckboxGroup = <T extends FieldValues>(props: Props<T>) => {
	const {
		name,
		label,
		options,
		helperText,
		orientation,
		size,
		variant,
		color,
        getDisabledOptions,
		...otherProps
	} = props

	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onBlur, onChange, value, ref },
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
									<Checkbox
										ref={index === 0 ? ref : undefined}
										onChange={() => {
											if (value.includes(option.value)) {
												onChange(value.filter((v: string) => v !== option.value))
											} else {
												onChange([...value, option.value])
											}
										}}
                                        onBlur={onBlur}
										checked={value.includes(option.value)}
										offset={
											orientation === 'vertical'
												? 'left'
												: index === 0
													? 'left'
													: undefined
										}
										color={color}
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
