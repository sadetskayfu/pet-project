import { movieApi } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { getErrorMessage } from "@/shared/helpers/getErrorMessage"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { MutationMovieData } from "../model/MutationMovieData"
import { queryClient } from "@/shared/api"

export const useDeleteFromWished = (userId: number, onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending } = useMutation({
		mutationFn: ({ id }: MutationMovieData) => movieApi.removeFromWished(id),

        onSuccess: async (_, { title, id }) => {
            await queryClient.invalidateQueries({queryKey: [movieApi.baseKey, movieApi.wished, userId]})

            queryClient.invalidateQueries({queryKey: [movieApi.baseKey, 'list']})
            queryClient.invalidateQueries({queryKey: [movieApi.baseKey, id]})

            dispatch(addNotification({severity: 'success', message: `Медиа "${title}" успешно удалено из списка желаемых`}))

            onSuccess?.()
        },

		onError: (error, { title }) => {
			dispatch(
				addNotification({
					severity: "error",
					message: getErrorMessage(
						error,
						`Не удалось удалить медиа "${title}" из списка желаемых`
					),
				})
			)
		},
	})

	return { deleteFromWished: mutate, isPending }
}