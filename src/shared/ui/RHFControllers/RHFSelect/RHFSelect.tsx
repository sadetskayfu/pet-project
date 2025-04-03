import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { Select, SelectProps } from '@/shared/ui/Select'
import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { ReactElement, useMemo } from 'react'
import { OptionItem, OptionItemSelectVariant } from '@/shared/ui/OptionItem'
import { Typography } from '@/shared/ui/Typography'

interface Props<T extends FieldValues, O, V extends string | string[]>
	extends Omit<SelectProps<O, V>, 'children'> {
	name: Path<T>
	children?: ReactElement[] | ReactElement | null
	selectVariant?: OptionItemSelectVariant
	centerOptionContent?: boolean
}

export const RHFSelect = <T extends FieldValues, O, V extends string | string[]>(
	props: Props<T, O, V>
) => {
	const {
		name,
		helperText,
		children,
		options,
		onBlur: externalOnBlur,
		selectVariant,
		centerOptionContent,
		getOptionValue = (option) => option as string,
		getOptionLabel = (option) => option as string,
		...otherProps
	} = props

	const { control } = useFormContext()

	const renderOptions = useMemo(() => {
		if (!children && options.length > 0) {
			return options.map((option) => (
				<OptionItem
					selectVariant={selectVariant}
					centerContent={centerOptionContent}
					key={getOptionValue(option)}
					value={getOptionValue(option)}
				>
					<Typography size="default" color="inherit">
						{getOptionLabel(option)}
					</Typography>
				</OptionItem>
			))
		} else {
			return []
		}
	// eslint-disable-next-line
	}, [options, children, selectVariant])

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onBlur, ref, ...otherFieldProps },
				fieldState: { error },
			}) => (
				<Select
					// @ts-ignore
					selectRef={ref}
					onBlur={mergeEventHandlers([onBlur, externalOnBlur])}
					errored={!!error}
					helperText={error ? error?.message : helperText}
					children={children ? children : renderOptions}
					options={options}
					getOptionValue={getOptionValue}
					getOptionLabel={getOptionLabel}
					{...otherFieldProps}
					{...otherProps}
				/>
			)}
		/>
	)
}
