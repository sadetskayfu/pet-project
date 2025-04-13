import { reviewApi } from "@/entities/reviews"
import { useQuery } from "@tanstack/react-query"

export const useReviews = (movieId: number, enabled: boolean) => {
	const { data, error, isLoading } = useQuery({
		...reviewApi.getPopularReviewsForMovieQueryOptions(movieId), enabled
	})

	return { reviews: data, error, isLoading }
}
