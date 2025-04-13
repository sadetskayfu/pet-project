import { movieApi } from "@/entities/movies"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

type ToggleWatchedBody = {
	id: number
	title: string
	isWatched: boolean
}

export const useToggleWatched = (
	isMutatingRef: React.RefObject<boolean>
) => {
	const dispatch = useAppDispatch()

	const { mutate } = useMutation({
		mutationFn: ({ id, isWatched }: ToggleWatchedBody) =>
			movieApi.toggleWatched(id, isWatched),
		onMutate: async ({ id, isWatched }) => {
			if (isMutatingRef.current) return

			isMutatingRef.current = true

			const queryKey = movieApi.getMovieByIdQueryOptions(id).queryKey

			await queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueryData(queryKey)

			queryClient.setQueryData(queryKey, (oldData) => {
				if (!oldData) return oldData

				return { ...oldData, isWatched: !isWatched }
			})

			return { previousData }
		},

		onError: (_, { title, id }, context) => {
			queryClient.setQueryData([movieApi.baseKey, id], context?.previousData)

			dispatch(
				addNotification({
					severity: "error",
					message: `Ошибка при добавлении/удалении фильма "${title}" из списка просмотренных`,
				})
			)

			isMutatingRef.current = false
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, "list"] })

			isMutatingRef.current = false
		},
	})

	const toggleWatched = useCallback(
		(body: ToggleWatchedBody) => {
			if (!isMutatingRef.current) {
				mutate(body)
			}
		},
		[mutate, isMutatingRef]
	)

	return { toggleWatched }
}
