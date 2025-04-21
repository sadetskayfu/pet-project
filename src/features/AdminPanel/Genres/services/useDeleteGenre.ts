import { genreApi } from "@/entities/genres"
import { movieApi } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { getErrorMessage } from "@/shared/helpers/getErrorMessage"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useDeleteGenre = () => {
    const dispatch = useAppDispatch()

    const { mutate, isPending, variables } = useMutation({
        mutationFn: genreApi.deleteGenre,
        onSuccess(deletedGenre) {
            queryClient.setQueryData(genreApi.getGenresQueryOptions().queryKey, (oldData) => {
                if(oldData) {
                    return oldData.filter((genre) => genre.id !== deletedGenre.id)
                }
            })
            dispatch(
                addNotification({
                    severity: 'success',
                    message: `Жанр '${deletedGenre.name}' успешно удален`,
                })
            )

            queryClient.invalidateQueries({queryKey: [movieApi.baseKey]})
        },
        onError(error) {
            dispatch(
                addNotification({
                    severity: 'error',
                    message: getErrorMessage(error, `Не удалось удалить жанр`),
                })
            )
        },
    })

    return { deleteGenre: mutate, getIsPending: (id: number) => isPending && id === variables }
}