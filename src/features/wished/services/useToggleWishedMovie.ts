import { movieApi } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useRef } from "react"
import { ToggleWishedBody } from "../types"
import { Movie } from "@/entities/movies/model"

export const useToggleWishedMovie = (
) => {
    const isMutatingRef = useRef<boolean>(false)

    const dispatch = useAppDispatch()

    const { mutate } = useMutation({
        mutationFn: ({
            id,
            isWished,
        }: ToggleWishedBody) => movieApi.toggleWished(id, isWished),
        onMutate: async ({ id, isWished }) => {
            if (isMutatingRef.current) return

            isMutatingRef.current = true

            const queryKey = [movieApi.baseKey, id]

            await queryClient.cancelQueries({ queryKey })

            const previousData = queryClient.getQueryData(queryKey)

            queryClient.setQueryData(queryKey, (oldData: Movie) => {
                if (!oldData) return oldData

                return {...oldData, isWished: !isWished}
            })

            return { previousData }
        },

        onError: (_, { title, id }, context) => {
            queryClient.setQueryData([movieApi.baseKey, id], context?.previousData)

            dispatch(
                addNotification({
                    severity: "error",
                    message: `Failed to add/remove the movie "${title}" from wished list.`,
                })
            )

            isMutatingRef.current = false
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, "list"] })

            isMutatingRef.current = false
        },
    })

    const toggleWished = useCallback((body: ToggleWishedBody) => {
        if(!isMutatingRef.current) {
            mutate(body)
        }
    }, [mutate])

    return { toggleWished }
}
