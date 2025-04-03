import { useMemo } from 'react'

export const useRatingOptions = () => {
	const array = useMemo(
		() => Array.from({ length: 5 }, (_, index) => index + 5),
		[]
	)

	const ratingOptions = useMemo(
		() =>
			array.map((rating) => ({
				value: String(rating),
				label: `More than ${rating}`,
			})),
		[array]
	)

	return { ratingOptions }
}
