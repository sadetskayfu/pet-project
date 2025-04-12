import { Dialog, DialogProps } from "@/shared/ui/Dialog"
import { memo } from "react"
import {
	ReviewDialogContent,
	ReviewDialogContentProps,
} from "./ReviewDialogContent"

export interface ReviewDialogProps
	extends ReviewDialogContentProps,
		Omit<DialogProps, "children"> {}

export const ReviewDialog = memo((props: ReviewDialogProps) => {
	const { id, movieTitle, movieId, reviewId, defaultValues, onSuccess, ...otherProps } = props

	return (
		<Dialog {...otherProps}>
			<ReviewDialogContent
				id={id}
				movieTitle={movieTitle}
				movieId={movieId}
				reviewId={reviewId}
				defaultValues={defaultValues}
				onSuccess={onSuccess}
			/>
		</Dialog>
	)
})
