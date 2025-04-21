import { movieApi } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { getErrorMessage } from "@/shared/helpers/getErrorMessage"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useDeleteMovie = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending } = useMutation({
		mutationFn: movieApi.deleteMovie,
		onSuccess: async (deletedMovie) => {
			await queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `${deletedMovie.type === "movie" ? "Фильм" : deletedMovie.type === "series" ? "Сериал" : "Мультсериал"} '${deletedMovie.title}' успешно удален`,
					severity: "success",
				})
			)

			onSuccess?.()
		},

		onError: (error) => {
			dispatch(
				addNotification({
					message: getErrorMessage(error, "Ошибка при удалении медиа"),
					severity: "error",
				})
			)
		},
	})

	return {
		deleteMovie: mutate,
		isPending,
	}
}
