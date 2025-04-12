import { commentApi } from "@/entities/comments"
import { addNotification } from "@/features/Notifications"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/shared/api"
import { reviewApi } from "@/entities/reviews"

export type DeleteCommentBody = {
	commentId: number
}

export const useDeleteComment = (
	movieId: number,
	reviewId: number,
	onSuccess?: () => void
) => {
	const dispatch = useAppDispatch()

	const { mutate, error, isPending } = useMutation({
		mutationFn: ({ commentId }: DeleteCommentBody) =>
			commentApi.deleteComment(commentId),

		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [commentApi.baseKey, "list", reviewId],
				}),
				queryClient.invalidateQueries({
					queryKey: [reviewApi.baseKey, "list", movieId],
				}),
			])

			dispatch(
				addNotification({
					severity: "success",
					message: `Комментарий успешно удален`,
				})
			)

			onSuccess?.()
		},

		onError: () => {
			dispatch(
				addNotification({
					severity: "error",
					message: `Ошибка при удалении коментария`,
				})
			)
		},
	})

	return {
		deleteComment: mutate,
		error,
		isPending,
	}
}
