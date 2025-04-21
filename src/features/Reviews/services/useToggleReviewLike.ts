import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { reviewApi, ReviewInfinityListQueryParams } from "@/entities/reviews"
import { ReviewPageData, ToggleReviewLikeBody } from "../types"

export const useToggleReviewLike = (
	movieId: number,
	isMutatingRef: React.RefObject<boolean>,
	hasMutationRef: React.RefObject<boolean>,
	queryParams: ReviewInfinityListQueryParams
) => {
	const queryKey = [reviewApi.baseKey, "list", movieId, queryParams]

	const dispatch = useAppDispatch()

	const { mutate } = useMutation({
		mutationFn: ({ reviewId, isLiked }: ToggleReviewLikeBody) =>
			reviewApi.toggleLike(reviewId, isLiked),

		onMutate: async ({ reviewId, isLiked }) => {
			if (isMutatingRef.current) return

			await queryClient.cancelQueries({ queryKey })

			isMutatingRef.current = true

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
											isLiked: !isLiked,
											isDisliked: false,
											totalLikes: review.totalLikes + (isLiked ? -1 : 1),
											totalDislikes:
												review.totalDislikes + (isLiked ? 0 : review.isDisliked ? -1 : 0),
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
					message: `Ошибка при добавлении/удалении лайка у отзыва пользователя "${reviewUserName}"`,
				})
			)

			isMutatingRef.current = false
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [reviewApi.baseKey, reviewApi.popularKey],
			})
			queryClient.invalidateQueries({
				queryKey: [reviewApi.baseKey, reviewApi.lastKey],
			})

			isMutatingRef.current = false
			hasMutationRef.current = true
		},
	})

	const toggleReviewLike = useCallback(
		(body: ToggleReviewLikeBody) => {
			if (!isMutatingRef.current) {
				mutate(body)
			}
		},
		[mutate, isMutatingRef]
	)

	return { toggleReviewLike }
}
