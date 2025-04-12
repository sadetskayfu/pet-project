import { commentApi } from "@/entities/comments"
import { addNotification } from "@/features/Notifications"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { UpdateCommentBody as BaseUpdateCommentBody } from "@/entities/comments"
import { queryClient } from "@/shared/api"

export interface UpdateCommentBody extends BaseUpdateCommentBody {
	commentId: number
}

export const useUpdateComment = (reviewId: number, onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, isPending } = useMutation({
		mutationFn: ({ commentId, message }: UpdateCommentBody) =>
			commentApi.updateComment(commentId, { message }),

		onSuccess: (data, { commentId }) => {
			const queryKey = commentApi.getCommentsForReview(reviewId, {}).queryKey

			const comments = queryClient.getQueryData(queryKey)

			if (comments) {
				queryClient.setQueryData(queryKey, {
					...comments,
					pages: comments.pages.map((page) => ({
						...page,
						data: page.data.map((comment) => {
							if (comment.id === commentId) {
								return { ...comment, message: data.message, isChanged: data.isChanged }
							} else {
								return comment
							}
						}),
					})),
				})
			}

			dispatch(
				addNotification({
					severity: "success",
					message: `Ваш комментарий успешно изменен`,
				})
			)

			onSuccess?.()
		},

		onError: () => {
			dispatch(
				addNotification({
					severity: "error",
					message: `Ошибка при редактировании коментария`,
				})
			)
		},
	})

	return { updateComment: mutate, isPending }
}
