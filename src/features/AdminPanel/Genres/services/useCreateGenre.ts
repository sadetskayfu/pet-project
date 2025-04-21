import { genreApi } from "@/entities/genres"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { getErrorMessage } from "@/shared/helpers/getErrorMessage"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useCreateGenre = (onSuccess: () => void) => {
    const dispatch = useAppDispatch()

    const { mutate, isPending } = useMutation({
        mutationFn: genreApi.createGenre,
        onSuccess(genre) {
            queryClient.setQueryData(genreApi.getGenresQueryOptions().queryKey, (oldData) => {
                if(oldData) {
                    return [genre, ...oldData]
                }
   
            })
            dispatch(
                addNotification({
                    severity: 'success',
                    message: `Жанр '${genre.name}' успешно создан`,
                })
            )

            onSuccess()
        },
        onError(error) {
            dispatch(
                addNotification({
                    severity: 'error',
                    message: getErrorMessage(error, 'Не удалось создать жанр'),
                })
            )
        },
    })
    
    return { createGenre: mutate, isPending}
}