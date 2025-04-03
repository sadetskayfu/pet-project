import { movieApi } from '@/entities/movies'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useDeleteMovie = () => {
	const dispatch = useAppDispatch()

	const mutation = useMutation({
		mutationFn: 
			movieApi.deleteMovie,
		onSuccess: async (deletedMovie) => {
			await queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `Movie '${deletedMovie.title}' has been successfully deleted`,
					severity: 'success',
				})
			)
		},

        onError: (error) => {
            dispatch(addNotification({
                message: getErrorMessage(error, 'Error while deleting movie'),
                severity: 'error'
            }))
        }
	})

	return {
		deleteMovie: mutation.mutate,
		isPending: mutation.isPending,
	}
}
