import { commentApi } from "@/entities/comments"
import { addNotification } from "@/features/Notifications"
import { useAppDispatch } from "@/shared/redux/redux"
import { useMutation } from "@tanstack/react-query"
import { CreateCommentBody as BaseCreateCommentBody } from "@/entities/comments"
import { queryClient } from "@/shared/api"
import { reviewApi } from "@/entities/reviews"

export interface CreateCommentBody extends BaseCreateCommentBody {
	reviewUserName: string,
}

export const useCreateComment = (movieId: number, onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const { mutate, error, isPending } = useMutation({
		mutationFn: ({ reviewId, message }: CreateCommentBody) =>
			commentApi.createComment({ reviewId, message }),

		onSuccess: async (_, { reviewId, reviewUserName }) => {
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
					message: `Комментарий успешно добавлен к отзыву пользователя "${reviewUserName}"`,
				})
			)

			onSuccess?.()
		},

		onError: (_, { reviewUserName }) => {
			dispatch(
				addNotification({
					severity: "error",
					message: `Ошибка при добавлении коментария к отзыву пользователя "${reviewUserName}"`,
				})
			)
		},
	})

	return { createComment: mutate, error, isPending }
}
