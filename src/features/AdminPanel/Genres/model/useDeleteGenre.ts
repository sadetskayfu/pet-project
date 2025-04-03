import { Genre, genreApi } from "@/entities/genres"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { getErrorMessage } from "@/shared/helpers/getErrorMessage"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useDeleteGenre = () => {
    const dispatch = useAppDispatch()

    const deleteGenreMutation = useMutation({
        mutationFn: genreApi.deleteGenre,
        onSuccess(deletedGenre) {
            queryClient.setQueryData([genreApi.baseKey], (oldData: Genre[]) => {
                return oldData.filter((genre) => genre.id !== deletedGenre.id)
            })
            dispatch(
                addNotification({
                    severity: 'success',
                    message: `Genre '${deletedGenre.name}' has been successfully deleting`,
                })
            )
        },
        onError(error) {
            const message = getErrorMessage(error, `Error while deleting genre`)
            dispatch(
                addNotification({
                    severity: 'error',
                    message,
                })
            )
        },
    })

    const handleDelete = (id: number) => {
        deleteGenreMutation.mutate(id)
    }

    return { handleDelete, deleteLoading: deleteGenreMutation.isPending }
}