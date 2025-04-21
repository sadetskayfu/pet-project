import { actorApi } from '@/entities/actors'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useCreateActor = (onSuccess: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending, error } = useMutation({
		mutationFn: actorApi.createActor,
		onSuccess: async (createdActor) => {
			await queryClient.invalidateQueries({
				queryKey: [actorApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `Актор '${createdActor.firstName} ${createdActor.lastName}' успешно создан`,
					severity: 'success',
				})
			)
			
			onSuccess()
		},
	})

	return {
		createActor: mutate,
		isPending,
		error,
	}
}
