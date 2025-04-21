import { movieApi } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useCreateMovie = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending, error } = useMutation({
		mutationFn: movieApi.createMovie,
		onSuccess: async (createdMovie) => {
			await queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey],
			})

			dispatch(
				addNotification({
					message: `${createdMovie.type === "movie" ? "Фильм" : createdMovie.type === "series" ? "Сериал" : "Мультсериал"} '${createdMovie.title}' успешно создан`,
					severity: "success",
				})
			)

			onSuccess?.()
		},
	})

	return {
		createMovie: mutate,
		isPending,
		error,
	}
}
