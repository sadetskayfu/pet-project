import { commentApi, CommentInfinityListQueryParams } from "@/entities/comments"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useComments = (
	reviewId: number,
	queryParams: CommentInfinityListQueryParams,
	enabled: boolean
) => {
	const {
		data,
		error,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		...commentApi.getCommentsForReview(reviewId, queryParams),
		enabled,
	})

	return {
		comments: data,
		error,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	}
}
