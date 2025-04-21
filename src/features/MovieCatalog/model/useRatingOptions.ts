import { useMemo } from 'react'

export const useRatingOptions = () => {
	const array = useMemo(
		() => Array.from({ length: 4 }, (_, index) => index + 1),
		[]
	)

	const ratingOptions = useMemo(
		() =>
			array.map((rating) => ({
				value: String(rating),
				label: `${rating} и более`,
			})),
		[array]
	)

	return { ratingOptions }
}
