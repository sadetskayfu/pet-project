import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import {
	ToggleButtonGroup,
	ToggleButtonGroupProps as BaseToggleButtonGroupProps,
} from '@/shared/ui/ToggleButtonGroup'
import { Option } from '../types/Option'
import {
	ToggleButton,
	ToggleButtonBorderRadius,
	ToggleButtonColor,
	ToggleButtonSize,
} from '@/shared/ui/ToggleButton'
import { ReactNode } from 'react'

type ToggleButtonGroupProps = Omit<
	BaseToggleButtonGroupProps,
	'children' | 'onChange' | 'value' | 'errored'
>

interface Props<T extends FieldValues> extends ToggleButtonGroupProps {
	name: Path<T>
	children?: ReactNode
	options?: Option[]
	size?: ToggleButtonSize
	color?: ToggleButtonColor
	borderRadius?: ToggleButtonBorderRadius
	optional?: boolean
	getDisabledOptions?: (value: string, index: number) => boolean
	getButtonContent?: (option: Option) => ReactNode
}

export const RHFToggleButtonGroup = <T extends FieldValues>(
	props: Props<T>
) => {
	const {
		name,
		children,
		options,
		size,
		color,
		borderRadius,
		optional,
		getDisabledOptions,
		getButtonContent,
		...otherProps
	} = props

	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value, ref } }) => {
				return (
					<ToggleButtonGroup
						value={value}
						onChange={(buttonValue) => {
							if(optional && value === buttonValue ) {
								onChange('')
							} else {
								onChange(buttonValue)
							}
						}}
						{...otherProps}
					>
						{children
							? children
							: options?.map((option, index) => (
									<ToggleButton
										key={option.value}
										ref={index === 0 ? ref : undefined}
										value={option.value}
										color={color}
										size={size}
										borderRadius={borderRadius}
										disabled={getDisabledOptions?.(option.value, index)}
									>
										{getButtonContent ? getButtonContent(option) : option.label}
									</ToggleButton>
								))}
					</ToggleButtonGroup>
				)
			}}
		/>
	)
}
