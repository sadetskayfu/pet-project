import { CreateGenreBody, Genre, genreApi } from "@/entities/genres";
import { addNotification } from "@/features/Notifications";
import { queryClient } from "@/shared/api";
import { getErrorMessage } from "@/shared/helpers/getErrorMessage";
import { useAppDispatch } from "@/shared/redux/redux";
import { useMutation } from "@tanstack/react-query";

export const useUpdateGenre = () => {
    const dispatch = useAppDispatch()

    const updateGenreMutation = useMutation({
		mutationFn: ({ id, body }: { id: number; body: CreateGenreBody }) =>
			genreApi.updateGenre(id, body),
		onSuccess(updatedGenre) {
            queryClient.setQueryData([genreApi.baseKey], (oldData: Genre[]) => {
                return oldData.map((genre) => {
                    if(updatedGenre.id === genre.id) {
                        return updatedGenre
                    } else {
                        return genre
                    }
                })
            })
			dispatch(
				addNotification({
					severity: 'success',
					message: `Genre has been successfully updated. New genre name '${updatedGenre.name}'`,
				})
			)
		},
		onError(error) {
			const message = getErrorMessage(error, `Error while updating genre`)
			dispatch(
				addNotification({
					severity: 'error',
					message,
				})
			)
		},
	})

	const handleUpdate = (value: string, id: number) => {
		updateGenreMutation.mutate({ id, body: { name: value } })
	}

    return { handleUpdate, updateLoading: updateGenreMutation.isPending }
}