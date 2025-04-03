import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { Slider, SliderProps } from '@/shared/ui/Slider'

interface Props<T extends FieldValues> extends SliderProps {
	name: Path<T>
}

export const RHFSlider = <T extends FieldValues>(props: Props<T>) => {
	const { name, ...otherProps } = props

	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange } }) => {
				return <Slider value={value} onChange={onChange} {...otherProps} />
			}}
		/>
	)
}
