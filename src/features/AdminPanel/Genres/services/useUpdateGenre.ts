import { genreApi } from "@/entities/genres";
import { movieApi } from "@/entities/movies";
import { addNotification } from "@/features/Notifications";
import { queryClient } from "@/shared/api";
import { getErrorMessage } from "@/shared/helpers/getErrorMessage";
import { useAppDispatch } from "@/shared/redux/redux";
import { useMutation } from "@tanstack/react-query";

export const useUpdateGenre = () => {
    const dispatch = useAppDispatch()

    const { mutate, isPending, variables } = useMutation({
		mutationFn: ({ id, name }: { id: number; name: string }) =>
			genreApi.updateGenre(id, name),
		onSuccess(updatedGenre) {
            queryClient.setQueryData(genreApi.getGenresQueryOptions().queryKey, (oldData) => {
				if(oldData) {
					return oldData.map((genre) => {
						if(updatedGenre.id === genre.id) {
							return updatedGenre
						} else {
							return genre
						}
					})
				}

            })
			dispatch(
				addNotification({
					severity: 'success',
					message: `Жанр успешно изменен. Новое название жанра '${updatedGenre.name}'`,
				})
			)

			queryClient.invalidateQueries({queryKey: [movieApi.baseKey]})
		},
		onError(error) {
			const message = getErrorMessage(error, `Не удалось изменить жанр`)
			dispatch(
				addNotification({
					severity: 'error',
					message,
				})
			)
		},
	})

    return { updateGenre: mutate, getIsPending: (id: number) => isPending && variables.id === id }
}