import { movieApi } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { getErrorMessage } from "@/shared/helpers/getErrorMessage"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { MutationMovieData } from "../model/MutationMovieData"
import { queryClient } from "@/shared/api"
import { profileApi } from "@/entities/profile"

export const useDeleteFromWatched = (userId: number, onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending } = useMutation({
		mutationFn: ({ id }: MutationMovieData) => movieApi.removeFromWatched(id),

        onSuccess: async (data, { title, id }) => {
            await queryClient.invalidateQueries({queryKey: [movieApi.baseKey, movieApi.watched, userId]})

			queryClient.setQueryData(profileApi.getUserProfileQueryOptions(userId).queryKey, (oldData) => {
				if(oldData) {
					return {...oldData, totalWatchedMedia: data.totalWatchedMedia}
				}
			})

            queryClient.invalidateQueries({queryKey: [movieApi.baseKey, 'list']})
            queryClient.invalidateQueries({queryKey: [movieApi.baseKey, id]})

            dispatch(addNotification({severity: 'success', message: `Медиа "${title}" успешно удалено из списка просмотренных`}))

            onSuccess?.()
        },

		onError: (error, { title }) => {
			dispatch(
				addNotification({
					severity: "error",
					message: getErrorMessage(
						error,
						`Не удалось удалить медиа "${title}" из списка просмотренных`
					),
				})
			)
		},
	})

	return { deleteFromWatched: mutate, isPending }
}
