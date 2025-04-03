import { CreateMovieBody, movieApi } from '@/entities/movies'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useUpdateMovie = (onCloseDialog: () => void) => {
	const dispatch = useAppDispatch()

	const mutation = useMutation({
		mutationFn: ({ id, body }: { id: number; body: CreateMovieBody }) =>
			movieApi.updateMovie(id, body),
		onSuccess: async (updatedMovie) => {
			await queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `Movie '${updatedMovie.title}' has been successfully updated`,
					severity: 'success',
				})
			)

            onCloseDialog()
		},
	})

	return {
		updateMovie: mutation.mutate,
		isPending: mutation.isPending,
		isSuccess: mutation.isSuccess,
		error: mutation.error,
	}
}
