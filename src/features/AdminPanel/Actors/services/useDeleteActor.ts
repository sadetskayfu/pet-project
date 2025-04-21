import { actorApi } from '@/entities/actors'
import { movieApi } from '@/entities/movies'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useDeleteActor = (onSuccess: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending } = useMutation({
		mutationFn: actorApi.deleteActor,
		onSuccess: async (deletedActor) => {
			await queryClient.invalidateQueries({
				queryKey: [actorApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `Актор ${deletedActor.firstName} ${deletedActor.lastName} успешно удален`,
					severity: 'success',
				})
			)

			queryClient.invalidateQueries({queryKey: [movieApi.baseKey]})

			onSuccess()
		},
		onError: (error) => {
			dispatch(
				addNotification({
					message: getErrorMessage(error, 'Не удалось удалить актера'),
					severity: 'error',
				})
			)
		},
	})

	return { deleteActor: mutate, isPending }
}
