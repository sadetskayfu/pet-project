import { Controller, FieldValues, useFormContext, Path } from 'react-hook-form'
import { StarRating, StarRatingProps } from '@/shared/ui/StarRating'

interface Props<T extends FieldValues> extends Omit<StarRatingProps, 'value' | 'onChange'> {
	name: Path<T>
}

export const RHFStartRating = <T extends FieldValues>(props: Props<T>) => {
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
			render={({ field : { ref, ...otherFieldProps }, fieldState: { error } }) => {
				return (
					<StarRating
						errored={!!error}
						helperText={error ? error.message : helperText}
						firstStarRef={ref}
                        {...otherProps}
						{...otherFieldProps}
					/>
				)
			}}
		/>
	)
}
