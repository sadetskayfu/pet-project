import { actorApi } from '@/entities/actors'
import { movieApi } from '@/entities/movies'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useDeleteActor = () => {
	const dispatch = useAppDispatch()

	const { mutate, isPending } = useMutation({
		mutationFn: actorApi.deleteActor,
		onSuccess: async (deletedActor) => {
			await queryClient.invalidateQueries({
				queryKey: [actorApi.baseKey],
			})

            queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `Actor ${deletedActor.firstName} ${deletedActor.lastName} has successfully deleted`,
					severity: 'success',
				})
			)
		},
		onError: (error) => {
			dispatch(
				addNotification({
					message: getErrorMessage(error, 'Error while deleted actor'),
					severity: 'error',
				})
			)
		},
	})

	return { deleteActor: mutate, isPending }
}
