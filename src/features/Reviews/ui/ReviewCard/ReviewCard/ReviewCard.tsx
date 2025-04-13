import { lazy, memo, ReactNode, Suspense, useCallback, useId } from "react"
import { TextWithToggle } from "@/shared/ui/TextWithToggle"
import { DisplayStarRating } from "@/shared/ui/StarRating"
import { UserCard } from "../UserCard/UserCard"
import { Actions } from "../Actions/Actions"
import { ToggleReviewDislikeBody, ToggleReviewLikeBody } from "../../../types"
import { classNames } from "@/shared/helpers/classNames"
import { IconButton } from "@/shared/ui/IconButton"
import { Chat } from "@/shared/assets/icons"
import { Review, ReviewUserResponse } from "@/entities/reviews"
import { useAppDispatch } from "@/shared/redux/redux"
import { reviewActions } from "@/features/Reviews/model/reviewSlice"
import { Composite, CompositeItem } from "@floating-ui/react"
import { Typography } from "@/shared/ui/Typography"
import { getPostTimeLabel } from "@/shared/helpers/getPostTimeLabel"
import { MutationReviewData } from "../../ReviewsFormMovie/ReviewList/ReviewList"
import styles from "./style.module.scss"

const UserActions = lazy(() => import("./UserActions"))

interface ReviewCardProps extends Review {
	className?: string
	children?: ReactNode
	user: ReviewUserResponse
	isExpandedMessage: boolean
	isOpenComments: boolean
	isUserReview?: boolean
	onToggleLike: (body: ToggleReviewLikeBody) => void
	onToggleDislike: (body: ToggleReviewDislikeBody) => void
	onDelete?: (
		reviewId: number,
		deleteButtonRef: React.RefObject<HTMLButtonElement | null>
	) => void
	onEdit?: (
		data: MutationReviewData,
		editButtonRef: React.RefObject<HTMLButtonElement | null>
	) => void
}

export const ReviewCard = memo((props: ReviewCardProps) => {
	const {
		className,
		children,
		id: reviewId,
		user,
		message,
		rating,
		createdAt,
		isCommented,
		isDisliked,
		isLiked,
		isChanged,
		totalLikes,
		totalComments,
		totalDislikes,
		isExpandedMessage,
		isOpenComments,
		isUserReview,
		onToggleDislike,
		onToggleLike,
		onDelete,
		onEdit,
	} = props

	const id = useId()
	const commentsBodyId = id + "comments-body"
	const commentButtonId = id + "comment-button"

	const userName = user.displayName || user.email

	const dispatch = useAppDispatch()

	const toggleLike = useCallback(() => {
		onToggleLike({ reviewId, isLiked, reviewUserName: userName })
	}, [reviewId, isLiked, userName, onToggleLike])

	const toggleDislike = useCallback(() => {
		onToggleDislike({ reviewId, isDisliked, reviewUserName: userName })
	}, [reviewId, isDisliked, userName, onToggleDislike])

	const toggleMessage = useCallback(() => {
		dispatch(reviewActions.toggleReviewMessage(reviewId))
	}, [dispatch, reviewId])

	const closeMessage = useCallback(() => {
		dispatch(reviewActions.closeReviewMessage(reviewId))
	}, [dispatch, reviewId])

	const toggleComments = useCallback(() => {
		dispatch(reviewActions.toggleComments(reviewId))
	}, [dispatch, reviewId])

	const handleDelete = useCallback(
		(deleteButtonRef: React.RefObject<HTMLButtonElement | null>) => {
			onDelete?.(reviewId, deleteButtonRef)
		},
		[reviewId, onDelete]
	)

	const handleEdit = useCallback(
		(editButtonRef: React.RefObject<HTMLButtonElement | null>) => {
			onEdit?.({reviewId, message, rating}, editButtonRef)
		},
		[reviewId, message, rating, onEdit]
	)

	return (
		<div className={classNames(styles["review-card-container"], [className])}>
			<Composite
				render={
					<div className={styles["review-card"]}>
						<UserCard
							{...user}
							name={userName}
							country={user.country.label}
							isUser={isUserReview}
						/>
						<div className={styles["body"]}>
							<div className={styles["body__header"]}>
								<DisplayStarRating
									aria-label={`Рейтинг отзыва ${rating}`}
									size="s"
									value={rating}
									maxStars={5}
								/>
								<Typography size="helper">
									{getPostTimeLabel(createdAt)} {isChanged && "(изм.)"}
								</Typography>
							</div>
							<TextWithToggle
								className={styles["message"]}
								maxHeight={100}
								expanded={isExpandedMessage}
								onToggle={toggleMessage}
								onClose={closeMessage}
								getButtonLabel={(expanded) => expanded ? 'Скрыть' : 'Читать все'}
								compositeButton
							>
								{message}
							</TextWithToggle>
							<div className={styles["review-card__actions"]}>
								<Actions
									isUser={isUserReview}
									isDisliked={isDisliked}
									isLiked={isLiked}
									isCommented={isCommented}
									totalDislikes={totalDislikes}
									totalLikes={totalLikes}
									totalComments={totalComments}
									onToggleDislike={toggleDislike}
									onToggleLike={toggleLike}
									commentButton={
										<CompositeItem
											render={
												<IconButton
													id={commentsBodyId}
													onClick={toggleComments}
													color="inherit"
													variant="clear"
													size="s"
													aria-label="Комментарии"
													aria-controls={isOpenComments ? commentsBodyId : undefined}
													aria-expanded={isOpenComments ? "true" : "false"}
												>
													<Chat />
												</IconButton>
											}
										/>
									}
								/>
								{isUserReview && (
									<Suspense fallback={null}>
										<UserActions onDelete={handleDelete} onEdit={handleEdit} />
									</Suspense>
								)}
							</div>
						</div>
					</div>
				}
			/>

			{isOpenComments && (
				<div
					id={commentsBodyId}
					aria-labelledby={commentButtonId}
					className={styles["comments-body"]}
					role="region"
				>
					{children}
				</div>
			)}
		</div>
	)
})
