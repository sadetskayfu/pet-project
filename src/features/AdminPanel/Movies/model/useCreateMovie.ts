import { movieApi } from '@/entities/movies'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useCreateMovie = (onResetForm: () => void) => {
	const dispatch = useAppDispatch()

	const mutation = useMutation({
		mutationFn: movieApi.createMovie,
		onSuccess: async (createdMovie) => {
			await queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `Movie '${createdMovie.title}' has been successfully created`,
					severity: 'success',
				})
			)

			onResetForm()
		},
	})

	return {
		createMovie: mutation.mutate,
		isPending: mutation.isPending,
        isSuccess: mutation.isSuccess,
		error: mutation.error,
	}
}
