import { ConfirmationDeleteDialog } from "@/widgets/ConfirmationDeleteDialog"
import { memo, useCallback } from "react"
import { useDeleteComment } from "../../services/useDeleteComment"

interface DeleteCommentDialogProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	returnFocus: React.RefObject<HTMLElement | null>
	saveReturnFocus: React.RefObject<HTMLElement | null>
	reviewId: number
	movieId: number
	commentId: number
}

const DeleteCommentDialog = memo((props: DeleteCommentDialogProps) => {
	const {
		movieId,
		reviewId,
		commentId,
		open,
		setOpen,
		returnFocus,
		saveReturnFocus,
	} = props

	const handleCloseDialog = useCallback(() => {
		returnFocus.current = null
		setOpen(false)
		saveReturnFocus.current?.focus()
	}, [saveReturnFocus, returnFocus, setOpen])

	const { deleteComment, isPending: isDeletePending } = useDeleteComment(
		movieId,
		reviewId,
		handleCloseDialog
	)

	return (
		<ConfirmationDeleteDialog
            title="Вы уверены, что хотите удалить этот комментарий?"
			open={open}
			setOpen={setOpen}
			returnFocus={returnFocus}
			loading={isDeletePending}
			onDelete={() => deleteComment({ commentId })}
		/>
	)
})

export default DeleteCommentDialog