import { DialogClose, DialogContent, DialogHeading } from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { lazy, Suspense } from "react"
import { ReviewFormSkeleton } from "../ReviewForm/ReviewFormSkeleton"
import { Button } from "@/shared/ui/Button"
import { ReviewFormSchema } from "../../model/ReviewFormSchema"
import styles from "./style.module.scss"
import { MediaType } from "@/entities/movies"

const CreateReviewForm = lazy(() => import("../ReviewForm/CreateReviewForm"))
const UpdateReviewForm = lazy(() => import("../ReviewForm/UpdateReviewForm"))

export interface ReviewDialogContentProps {
	id?: string
	reviewId?: number
	movieId?: number
	movieTitle: string
	mediaType: MediaType
	defaultValues?: ReviewFormSchema
	onSuccess: () => void
}

export const ReviewDialogContent = (props: ReviewDialogContentProps) => {
	const { id, reviewId, movieId, movieTitle, mediaType, defaultValues, onSuccess } = props

	const entity = mediaType === 'movie' ? 'фильм' : mediaType === 'series' ? 'сериал' : 'мультфильм'

	return (
		<DialogContent
			containerClassName={styles["review-dialog"]}
			className={styles["review-dialog__content"]}
			id={id}
		>
			<DialogHeading>
				<Typography color="hard" size="h5">
					{reviewId
						? `Измените свой отзыв на ${entity} ${movieTitle}`
						: `Оцените ${entity} ${movieTitle}`}
				</Typography>
			</DialogHeading>
			<Suspense fallback={<ReviewFormSkeleton />}>
				{reviewId ? (
					<UpdateReviewForm
						reviewId={reviewId}
						onSuccess={onSuccess}
						defaultValues={defaultValues!}
					>
						<DialogClose>
							<Button>Отмена</Button>
						</DialogClose>
					</UpdateReviewForm>
				) : (
					<CreateReviewForm movieId={movieId!} onSuccess={onSuccess}>
						<DialogClose>
							<Button>Отмена</Button>
						</DialogClose>
					</CreateReviewForm>
				)}
			</Suspense>
		</DialogContent>
	)
}
