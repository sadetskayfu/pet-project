import { Genre, genreApi } from "@/entities/genres"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { cleanSpaces } from "@/shared/helpers/formattingString"
import { getErrorMessage } from "@/shared/helpers/getErrorMessage"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"

export const useCreateGenre = () => {
    const dispatch = useAppDispatch()

    const createGenreMutation = useMutation({
        mutationFn: genreApi.createGenre,
        onSuccess(genre) {
            queryClient.setQueryData([genreApi.baseKey], (oldData: Genre[]) => {
                if(!oldData) return [genre]

                return [genre, ...oldData]
            })
            dispatch(
                addNotification({
                    severity: 'success',
                    message: `Genre '${genre.name}' has been successfully created`,
                })
            )
        },
        onError(error) {
            const message = getErrorMessage(error, 'Error while creating genre')
            dispatch(
                addNotification({
                    severity: 'error',
                    message,
                })
            )
        },
    })
    
    const handleCreate = (value: string) => {
        const cleanedValue = cleanSpaces(value)
        console.log(value, cleanedValue)
        createGenreMutation.mutate({ name: cleanedValue })
    }

    return { handleCreate, createLoading: createGenreMutation.isPending }
}