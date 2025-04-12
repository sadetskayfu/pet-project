import { movieApi, MovieInfinityListQueryParams } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useRef } from "react"
import { MoviePageData, ToggleWishedBody } from "../types"

export const useToggleWishedMovieInList = (
	queryParams: MovieInfinityListQueryParams
) => {
	const isMutatingRef = useRef<boolean>(false)

	const queryKey = [movieApi.baseKey, "list", queryParams]

	const dispatch = useAppDispatch()

	const { mutate } = useMutation({
		mutationFn: ({
			id,
			isWished,
		}: ToggleWishedBody) => movieApi.toggleWished(id, isWished),
		onMutate: async ({ id, isWished }) => {
			if (isMutatingRef.current) return

			isMutatingRef.current = true

			await queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueryData(queryKey)

			queryClient.setQueryData(queryKey, (oldData: { pages: MoviePageData[] }) => {
				if (!oldData) return oldData

				return {
					...oldData,
					pages: oldData.pages.map((page) => ({
						...page,
						data: page.data.map((movie) =>
							movie.id === id ? { ...movie, isWatched: !isWished } : movie
						),
					})),
				}
			})

			return { previousData }
		},

		onError: (_, { title }, context) => {
			queryClient.setQueryData(queryKey, context?.previousData)

			dispatch(
				addNotification({
					severity: "error",
					message: `Failed to add/remove the movie "${title}" from wished list.`,
				})
			)

			isMutatingRef.current = false
		},
		onSuccess: (_, id) => {
			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, "list"] })
			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, id] })

			isMutatingRef.current = false
		},
	})

	const toggleWatched = useCallback((body: ToggleWishedBody) => {
		if(!isMutatingRef.current) {
			mutate(body)
		}
	}, [mutate])

	return { toggleWatched }
}
