import { addNotification } from "@/features/Notifications"
import { queryClient } from "@/shared/api"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { commentApi, CommentInfinityListQueryParams } from "@/entities/comments"
import { CommentPageData, ToggleCommentLikeBody } from "../types"

export const useToggleCommentLike = (
	reviewId: number,
	isMutatingRef: React.RefObject<boolean>,
	queryParams: CommentInfinityListQueryParams
) => {
	const queryKey = [commentApi.baseKey, "list", reviewId, queryParams]

	const dispatch = useAppDispatch()

	const { mutate } = useMutation({
		mutationFn: ({ commentId, isLiked }: ToggleCommentLikeBody) =>
			commentApi.toggleLike(commentId, isLiked),

		onMutate: async ({ commentId, isLiked }) => {
			if (isMutatingRef.current) return

			await queryClient.cancelQueries({ queryKey })

			isMutatingRef.current = true

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
											isLiked: !isLiked,
											isDisliked: false,
											totalLikes: comment.totalLikes + (isLiked ? -1 : 1),
											totalDislikes:
												comment.totalDislikes + (isLiked ? 0 : comment.isDisliked ? -1 : 0),
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
					message: `Ошибка при добавлении/удалении лайка у комментария пользователя "${commentUserName}"`,
				})
			)

			isMutatingRef.current = false
		},
		onSuccess: () => {
			isMutatingRef.current = false
		},
	})

	const toggleCommentLike = useCallback(
		(body: ToggleCommentLikeBody) => {
			if (!isMutatingRef.current) {
				mutate(body)
			}
		},
		[mutate, isMutatingRef]
	)

	return { toggleCommentLike }
}
