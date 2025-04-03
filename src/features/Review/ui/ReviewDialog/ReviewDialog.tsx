import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeading,
	DialogProps,
} from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { Button } from "@/shared/ui/Button"
import { lazy, Suspense } from "react"
import { ReviewFormSkeleton } from "../ReviewForms/ReviewFormSkeleton"
import styles from "./style.module.scss"

const CreateReviewForm = lazy(() => import("../ReviewForms/CreateReviewForm"))
const UpdateReviewForm = lazy(() => import("../ReviewForms/UpdateReviewForm"))

interface ReviewDialog extends Omit<DialogProps, "children"> {
	movieTitle: string
	movieId?: number
	reviewId?: number
}

export const ReviewDialog = (props: ReviewDialog) => {
	const { movieTitle, movieId, reviewId, setOpen, ...otherProps } = props

	return (
		<Dialog setOpen={setOpen} {...otherProps}>
			<DialogContent
				containerClassName={styles["dialog"]}
				className={styles["content"]}
			>
				<DialogHeading>
					<Typography color="primary" size="h5" component="h2">
						Rate the movie "{movieTitle}"
					</Typography>
				</DialogHeading>
				<Suspense fallback={<ReviewFormSkeleton />}>
					{reviewId ? (
						<UpdateReviewForm
							movieTitle={movieTitle}
							reviewId={reviewId}
							onSuccess={() => setOpen?.(false)}
						>
							<DialogClose>
								<Button>Cancel</Button>
							</DialogClose>
						</UpdateReviewForm>
					) : (
						<CreateReviewForm
							movieTitle={movieTitle}
							movieId={movieId!}
							onSuccess={() => setOpen?.(false)}
						>
							<DialogClose>
								<Button>Cancel</Button>
							</DialogClose>
						</CreateReviewForm>
					)}
				</Suspense>
			</DialogContent>
		</Dialog>
	)
}
