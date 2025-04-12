import { movieApi } from "@/entities/movies"
import { reviewApi, UpdateReviewBody } from "@/entities/reviews"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useUpdateReview = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending, error } = useMutation({
		mutationFn: ({ id, body }: { id: number; body: UpdateReviewBody }) =>
			reviewApi.updateReview(id, body),
		onSuccess: async (data) => {
			const movieId = data.movie.id

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: reviewApi.getReviewsForMovieInfinityQueryOptions(movieId, {})
						.queryKey,
				}),
				queryClient.invalidateQueries({
					queryKey: movieApi.getMovieByIdQueryOptions(movieId).queryKey,
				}),
			])

			queryClient.invalidateQueries({
				queryKey: movieApi.getMoviesInfinityQueryOptions({}).queryKey,
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

			dispatch(
				addNotification({
					severity: "success",
					message: `Review of the movie "${data.movie.title}" has been successfully updated`,
				})
			)

			onSuccess?.()
		},
	})

	return { updateReview: mutate, isPending, error }
}
