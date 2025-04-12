import { reviewApi, ReviewInfinityListQueryParams } from "@/entities/reviews"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useReviews = (
	movieId: number,
	queryParams: ReviewInfinityListQueryParams,
	enabled: boolean
) => {
	const {
		data,
		error,
		isLoading,
		isRefetching,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		...reviewApi.getReviewsForMovieInfinityQueryOptions(movieId, queryParams),
		enabled,
	})

	return {
		reviews: data,
		error,
		isLoading,
		isRefetching,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	}
}
