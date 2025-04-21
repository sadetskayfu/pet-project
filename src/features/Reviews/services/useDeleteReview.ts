import { addNotification } from "@/features/Notifications"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { reviewApi } from "@/entities/reviews"
import { queryClient } from "@/shared/api"
import { movieApi } from "@/entities/movies"

type DeleteReviewBody = {
	reviewId: number
	movieTitle: string
}

export const useDeleteReview = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, error, isPending } = useMutation({
		mutationFn: ({ reviewId }: DeleteReviewBody) =>
			reviewApi.deleteReview(reviewId),

		onSuccess: async (data, { movieTitle }) => {
			const movieId = data.movie.id

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [reviewApi.baseKey, 'list', movieId]
				}),
				queryClient.invalidateQueries({
					queryKey: movieApi.getMovieByIdQueryOptions(movieId).queryKey,
				}),
			])

			queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey, 'list'],
			})
			queryClient.invalidateQueries({
				queryKey: reviewApi.getLastReviewsQueryOptions().queryKey,
			})
			queryClient.invalidateQueries({
				queryKey: reviewApi.getPopularReviewsQueryOptions().queryKey,
			})
			queryClient.invalidateQueries({
				queryKey: reviewApi.getLastReviewsForMovieQueryOptions(movieId).queryKey,
			})
			queryClient.invalidateQueries({
				queryKey: reviewApi.getPopularReviewsForMovieQueryOptions(movieId).queryKey,
			})

			//const todos = queryClient.getQueryData(reviewApi.getReviewsForMovieInfinityQueryOptions().queryKey)

			dispatch(
				addNotification({
					severity: "success",
					message: `Отзыв на медиа ${movieTitle} успешно удален`,
				})
			)

			onSuccess?.()
		},

		onError: (_, { movieTitle }) => {
			dispatch(
				addNotification({
					severity: "error",
					message: `Ошибка при удалении отзыва на фильм ${movieTitle}`,
				})
			)
		},
	})

	return {
		deleteReview: mutate,
		error,
		isPending,
	}
}
