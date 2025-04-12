import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { reviewApi, ReviewInfinityListQueryParams } from "@/entities/reviews"
import { ReviewPageData, ToggleReviewDislikeBody } from "../types"

export const useToggleReviewDislike = (
	movieId: number,
	isMutatingRef: React.RefObject<boolean>,
	hasMutationRef: React.RefObject<boolean>,
	queryParams: ReviewInfinityListQueryParams
) => {
	const queryKey = [reviewApi.baseKey, "list", movieId, queryParams]

	const dispatch = useAppDispatch()

	const { mutate } = useMutation({
		mutationFn: ({ reviewId, isDisliked }: ToggleReviewDislikeBody) =>
			reviewApi.toggleDislike(reviewId, isDisliked),

		onMutate: async ({ reviewId, isDisliked }) => {
			if (isMutatingRef.current) return

			isMutatingRef.current = true

			await queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueryData(queryKey)

			queryClient.setQueryData(
				queryKey,
				(oldData: { pages: ReviewPageData[] }) => {
					if (!oldData) return oldData

					return {
						...oldData,
						pages: oldData.pages.map((page) => ({
							...page,
							data: page.data.map((review) =>
								review.id === reviewId
									? {
											...review,
											isDisliked: !isDisliked,
											isLiked: false,
											totalDislikes: review.totalDislikes + (isDisliked ? -1 : 1),
											totalLikes:
												review.totalLikes + (isDisliked ? 0 : review.isLiked ? -1 : 0),
										}
									: review
							),
						})),
					}
				}
			)

			return { previousData }
		},

		onError: (_, { reviewUserName }, context) => {
			queryClient.setQueryData(queryKey, context?.previousData)

			dispatch(
				addNotification({
					severity: "error",
					message: `Ошибка при добавлении/удалении дизлайка у отзыва пользователя "${reviewUserName}"`,
				})
			)

			isMutatingRef.current = false
		},
		onSuccess: () => {
			isMutatingRef.current = false
			hasMutationRef.current = true
		},
	})

	const toggleReviewDislike = useCallback(
		(body: ToggleReviewDislikeBody) => {
			if (!isMutatingRef.current) {
				mutate(body)
			}
		},
		[mutate, isMutatingRef]
	)

	return { toggleReviewDislike }
}
