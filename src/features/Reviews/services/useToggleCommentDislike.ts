import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { commentApi, CommentInfinityListQueryParams } from "@/entities/comments"
import { CommentPageData, ToggleCommentDislikeBody } from "../types"

export const useToggleCommentDislike = (
	reviewId: number,
	isMutatingRef: React.RefObject<boolean>,
	queryParams: CommentInfinityListQueryParams
) => {
	const queryKey = [commentApi.baseKey, "list", reviewId, queryParams]

	const dispatch = useAppDispatch()

	const { mutate } = useMutation({
		mutationFn: ({ commentId, isDisliked }: ToggleCommentDislikeBody) =>
			commentApi.toggleDislike(commentId, isDisliked),

		onMutate: async ({ commentId, isDisliked }) => {
			if (isMutatingRef.current) return

			isMutatingRef.current = true

			await queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueryData(queryKey)

			queryClient.setQueryData(
				queryKey,
				(oldData: { pages: CommentPageData[] }) => {
					if (!oldData) return oldData

					return {
						...oldData,
						pages: oldData.pages.map((page) => ({
							...page,
							data: page.data.map((comment) =>
								comment.id === commentId
									? {
											...comment,
											isDisliked: !isDisliked,
											isLiked: false,
											totalDislikes: comment.totalDislikes + (isDisliked ? -1 : 1),
											totalLikes:
												comment.totalLikes + (isDisliked ? 0 : comment.isLiked ? -1 : 0),
										}
									: comment
							),
						})),
					}
				}
			)

			return { previousData }
		},

		onError: (_, { commentUserName }, context) => {
			queryClient.setQueryData(queryKey, context?.previousData)

			dispatch(
				addNotification({
					severity: "error",
					message: `Ошибка при добавлении/удалении дизлайка у комментария пользователя "${commentUserName}"`,
				})
			)

			isMutatingRef.current = false
		},
		onSuccess: () => {
			isMutatingRef.current = false
		},
	})

	const toggleCommentDislike = useCallback(
		(body: ToggleCommentDislikeBody) => {
			if (!isMutatingRef.current) {
				mutate(body)
			}
		},
		[mutate, isMutatingRef]
	)

	return { toggleCommentDislike }
}
