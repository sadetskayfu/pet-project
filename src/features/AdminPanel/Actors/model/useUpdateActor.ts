import { actorApi } from '@/entities/actors'
import { CreateActorBody } from '@/entities/actors/model/Actor'
import { movieApi } from '@/entities/movies'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useUpdateActor = (onCloseDialog: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending, error } = useMutation({
		mutationFn: ({ id, body }: { id: number; body: CreateActorBody }) =>
			actorApi.updateActor(id, body),
		onSuccess: async (updatedActor) => {
			await queryClient.invalidateQueries({
				queryKey: [actorApi.baseKey],
			})

			queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `Actor ${updatedActor.firstName} ${updatedActor.lastName} has been successfully updated.`,
					severity: 'success',
				})
			)

			onCloseDialog()
		},
	})

	return { updateActor: mutate, isPending, error }
}
