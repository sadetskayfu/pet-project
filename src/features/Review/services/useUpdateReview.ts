import { movieApi } from '@/entities/movies'
import { reviewApi, UpdateReviewBody } from '@/entities/reviews'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useUpdateReview = (movieTitle: string, onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending, error } = useMutation({
		mutationFn: ({ id, body }: { id: number; body: UpdateReviewBody }) =>
			reviewApi.updateReview(id, body),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [reviewApi.baseKey]
			})

			await queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey]
			})

			dispatch(
				addNotification({
					severity: 'success',
					message: `Review of the movie "${movieTitle}" has been successfully updated`,
				})
			)

            onSuccess?.()
		},
	})

	return { updateReview: mutate, isPending, error }
}
