import { movieApi, MovieInfinityListQueryParams } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

export type ToggleWishedBody = {
	id: number
	title: string
	isWished: boolean
}

export const useToggleWished = (
	isMutatingRef: React.RefObject<boolean>,
	queryParams: MovieInfinityListQueryParams
) => {
	const dispatch = useAppDispatch()

	const queryKey = movieApi.getMoviesInfinityQueryOptions(queryParams).queryKey

	const { mutate } = useMutation({
		mutationFn: ({
			id,
			isWished,
		}: ToggleWishedBody) => movieApi.toggleWished(id, isWished),
		onMutate: async ({ id, isWished }) => {
            if(isMutatingRef.current) return

            isMutatingRef.current = true

			await queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueryData(queryKey)

			queryClient.setQueryData(queryKey, (oldData) => {
				if(oldData) {
					return {
						...oldData,
						pages: oldData.pages.map((page) => ({
							...page,
							data: page.data.map((movie) =>
								movie.id === id ? { ...movie, isWished: !isWished } : movie
							),
						})),
					}
				}
			})

			return { previousData }
		},

		onError: (_, { title }, context) => {
			queryClient.setQueryData(queryKey, context?.previousData)

			dispatch(
				addNotification({
					severity: "error",
					message: `Ошибка при добавлении/удалении ${title} из списка желаемых`,
				})
			)

            isMutatingRef.current = false
		},
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, "list"] })
			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, id] })

            isMutatingRef.current = false
		},
	})

    const toggleWished = useCallback((body: ToggleWishedBody) => {
        if(!isMutatingRef.current) {
            mutate(body)
        }
    }, [mutate, isMutatingRef])

	return { toggleWished }
}
