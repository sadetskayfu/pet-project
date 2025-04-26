import { reviewApi } from "@/entities/reviews"
import { useQuery } from "@tanstack/react-query"

export const useReviews = (movieId: number) => {
	const { data, error, isLoading } = useQuery({
		...reviewApi.getLastReviewsForMovieQueryOptions(movieId)
	})

	return { reviews: data, error, isLoading }
}
