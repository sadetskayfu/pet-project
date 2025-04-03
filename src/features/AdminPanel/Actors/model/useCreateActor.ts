import { actorApi } from '@/entities/actors'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useCreateActor = (onResetForm: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending, error } = useMutation({
		mutationFn: actorApi.createActor,
		onSuccess: async (createdActor) => {
			await queryClient.invalidateQueries({
				queryKey: [actorApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `Actor '${createdActor.firstName} ${createdActor.lastName}' has been successfully created`,
					severity: 'success',
				})
			)
			
			onResetForm()
		},
	})

	return {
		createActor: mutate,
		isPending,
		error,
	}
}
