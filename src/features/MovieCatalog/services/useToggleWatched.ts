import { movieApi, MovieInfinityListQueryParams } from "@/entities/movies"
import { profileApi } from "@/entities/profile"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

export type ToggleWatchedBody = {
	id: number
	title: string
	isWatched: boolean
}

export const useToggleWatched = (
	isMutatingRef: React.RefObject<boolean>,
	queryParams: MovieInfinityListQueryParams
) => {
	const dispatch = useAppDispatch()

	const queryKey = movieApi.getMoviesInfinityQueryOptions(queryParams).queryKey

	const { mutate } = useMutation({
		mutationFn: ({
			id,
			isWatched,
		}: ToggleWatchedBody) => movieApi.toggleWatched(id, isWatched),
		onMutate: async ({ id, isWatched }) => {
			if (isMutatingRef.current) return

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
								movie.id === id ? { ...movie, isWatched: !isWatched } : movie
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
					message: `Ошибка при добавлении/удалении ${title} из списка просмотренных`,
				})
			)

			isMutatingRef.current = false
		},
		onSuccess: (data, { id }) => {
			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, "list"] })
			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, id] })
			
			queryClient.invalidateQueries({queryKey: [movieApi.baseKey, movieApi.watched, data.userId]})
			queryClient.invalidateQueries({queryKey: [profileApi.baseKey, data.userId]})

			isMutatingRef.current = false
		},
	})

	const toggleWatched = useCallback((body: ToggleWatchedBody) => {
		if(!isMutatingRef.current) {
			mutate(body)
		}
	}, [mutate, isMutatingRef])

	return { toggleWatched }
}
