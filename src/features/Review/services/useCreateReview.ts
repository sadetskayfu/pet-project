import { movieApi } from '@/entities/movies'
import { reviewApi } from '@/entities/reviews'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useCreateReview = (movieTitle: string, onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, error, isPending } = useMutation({
		mutationFn: reviewApi.createReview,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [reviewApi.baseKey]
			})

			await queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey]
			})

			dispatch(
				addNotification({
					message: `Review of the movie "${movieTitle}" has been successfully created`,
					severity: 'success',
				})
			)
			onSuccess?.()
		},
	})

	return { createReview: mutate, error, isPending }
}
