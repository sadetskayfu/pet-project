import { movieApi } from "@/entities/movies"
import { profileApi } from "@/entities/profile"
import { reviewApi } from "@/entities/reviews"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useCreateReview = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, error, isPending } = useMutation({
		mutationFn: reviewApi.createReview,
		onSuccess: async (data, { movieId }) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: reviewApi.getReviewsForMovieInfinityQueryOptions(movieId, {})
						.queryKey,
				}),
				queryClient.invalidateQueries({
					queryKey: movieApi.getMovieByIdQueryOptions(movieId).queryKey,
				}),
				queryClient.invalidateQueries({
					queryKey: movieApi.getMoviesInfinityQueryOptions({}).queryKey,
				}),
			])

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
			queryClient.invalidateQueries({
				queryKey: [profileApi.baseKey, data.user.id]
			})

			dispatch(
				addNotification({
					message: `Отзыв на медиа "${data.movie.title}" успешно создан`,
					severity: "success",
				})
			)
			onSuccess?.()
		},
	})

	return { createReview: mutate, error, isPending }
}
