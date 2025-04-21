import { actorApi } from '@/entities/actors'
import { CreateActorBody } from '@/entities/actors/model/Actor'
import { movieApi } from '@/entities/movies'
import { addNotification } from '@/features/Notifications'
import { queryClient } from '@/shared/api'
import { useAppDispatch } from '@/shared/redux/redux'
import { useMutation } from '@tanstack/react-query'

export const useUpdateActor = (onSuccess: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending, error } = useMutation({
		mutationFn: ({ id, body }: { id: number; body: CreateActorBody }) =>
			actorApi.updateActor(id, body),
		onSuccess: async (updatedActor) => {
			await queryClient.invalidateQueries({
				queryKey: [actorApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `Актор ${updatedActor.firstName} ${updatedActor.lastName} успешно изменен`,
					severity: 'success',
				})
			)

			queryClient.invalidateQueries({queryKey: [movieApi.baseKey]})

			onSuccess()
		},
	})

	return { updateActor: mutate, isPending, error }
}
