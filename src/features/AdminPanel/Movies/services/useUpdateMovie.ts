import { actorApi } from "@/entities/actors"
import { CreateMovieBody, movieApi } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useUpdateMovie = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending, error } = useMutation({
		mutationFn: ({ id, body }: { id: number; body: CreateMovieBody }) =>
			movieApi.updateMovie(id, body),
		onSuccess: async (updatedMovie) => {
			await queryClient.invalidateQueries({
				queryKey: [movieApi.baseKey],
			})

			queryClient.invalidateQueries({
				queryKey: actorApi.getActorsForMovieQueryOptions(updatedMovie.id).queryKey
			})

			dispatch(
				addNotification({
					message: `${updatedMovie.type === "movie" ? "Фильм" : updatedMovie.type === "series" ? "Сериал" : "Мультсериал"} '${updatedMovie.title}' успешно изменен`,
					severity: "success",
				})
			)

			onSuccess?.()
		},
	})

	return {
		updateMovie: mutate,
		isPending,
		error,
	}
}
