import { movieApi } from "@/entities/movies"
import { profileApi } from "@/entities/profile"
import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

type ToggleWishedBody = {
	id: number
	title: string
	isWished: boolean
}

export const useToggleWished = (
	isMutatingRef: React.RefObject<boolean>
) => {
	const dispatch = useAppDispatch()

	const { mutate } = useMutation({
		mutationFn: ({ id, isWished }: ToggleWishedBody) =>
			movieApi.toggleWished(id, isWished),
		onMutate: async ({ id, isWished }) => {
			if (isMutatingRef.current) return

			isMutatingRef.current = true

			const queryKey = movieApi.getMovieByIdQueryOptions(id).queryKey

			await queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueryData(queryKey)

			queryClient.setQueryData(queryKey, (oldData) => {
				if (!oldData) return oldData

				return { ...oldData, isWished: !isWished }
			})

			return { previousData }
		},

		onError: (_, { title, id }, context) => {
			queryClient.setQueryData([movieApi.baseKey, id], context?.previousData)

			dispatch(
				addNotification({
					severity: "error",
					message: `Ошибка при добавлении/удалении меида "${title}" из списка желаемых`,
				})
			)

			isMutatingRef.current = false
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, "list"] })

			queryClient.invalidateQueries({ queryKey: [movieApi.baseKey, movieApi.wished, data.userId] })
			queryClient.invalidateQueries({ queryKey: [profileApi.baseKey, data.userId] })

			isMutatingRef.current = false
		},
	})

	const toggleWished = useCallback(
		(body: ToggleWishedBody) => {
			if (!isMutatingRef.current) {
				mutate(body)
			}
		},
		[mutate, isMutatingRef]
	)

	return { toggleWished }
}
