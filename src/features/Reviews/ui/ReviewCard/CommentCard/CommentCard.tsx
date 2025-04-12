import { lazy, memo, Suspense, useCallback } from "react"
import { TextWithToggle } from "@/shared/ui/TextWithToggle"
import { UserCard } from "../UserCard/UserCard"
import { Actions } from "../Actions/Actions"
import { ToggleCommentDislikeBody, ToggleCommentLikeBody } from "../../../types"
import { classNames } from "@/shared/helpers/classNames"
import { Comment, CommentUserResponse } from "@/entities/comments"
import { useAppDispatch } from "@/shared/redux/redux"
import { reviewActions } from "@/features/Reviews/model/reviewSlice"
import { Composite } from "@floating-ui/react"
import { Typography } from "@/shared/ui/Typography"
import { getPostTimeLabel } from "@/shared/helpers/getPostTimeLabel"
import styles from "./style.module.scss"

const UserActions = lazy(() => import("./UserActions"))

interface CommentCardProps extends Comment {
	className?: string
	user: CommentUserResponse
	isUserComment?: boolean
	isExpandedMessage: boolean
	isOpenUpdateCommentForm?: boolean
	paddingTop?: number
	onToggleLike: (body: ToggleCommentLikeBody) => void
	onToggleDislike: (body: ToggleCommentDislikeBody) => void
	onDelete?: (
		commentId: number,
		deleteButtonRef: React.RefObject<HTMLButtonElement | null>
	) => void
	onEdit?: (
		commendId: number,
		message: string,
		editButtonRef: React.RefObject<HTMLButtonElement | null>
	) => void
}

export const CommentCard = memo((props: CommentCardProps) => {
	const {
		className,
		id,
		user,
		message,
		createdAt,
		isDisliked,
		isLiked,
		isChanged,
		totalLikes,
		totalDislikes,
		isUserComment,
		isExpandedMessage,
		paddingTop,
		onToggleLike,
		onToggleDislike,
		onDelete,
		onEdit,
	} = props
	const dispatch = useAppDispatch()

	const userName = user.displayName || user.email

	const toggleMessage = useCallback(() => {
		dispatch(reviewActions.toggleCommentMessage(id))
	}, [id, dispatch])

	const closeMessage = useCallback(() => {
		dispatch(reviewActions.closeCommentMessage(id))
	}, [id, dispatch])

	const toggleLike = useCallback(() => {
		onToggleLike({ commentId: id, isLiked, commentUserName: userName })
	}, [id, isLiked, userName, onToggleLike])

	const toggleDislike = useCallback(() => {
		onToggleDislike({ commentId: id, isDisliked, commentUserName: userName })
	}, [id, isDisliked, userName, onToggleDislike])

	const handleDelete = useCallback(
		(deleteButtonRef: React.RefObject<HTMLButtonElement | null>) => {
			onDelete?.(id, deleteButtonRef)
		},
		[id, onDelete]
	)

	const handleEdit = useCallback(
		(editButtonRef: React.RefObject<HTMLButtonElement | null>) => {
			onEdit?.(id, message, editButtonRef)
		},
		[id, message, onEdit]
	)

	return (
		<Composite
			render={
				<div
					style={{paddingTop}}
					className={classNames(styles["comment-card-container"], [className])}
				>
					<div className={styles['comment-card']}>
						<UserCard
							{...user}
							country={user.country.label}
							name={userName}
							isComment
							isUser={isUserComment}
						/>
						<div className={styles["comment-card__body"]}>
							<Typography size="helper">
								{getPostTimeLabel(createdAt)} {isChanged && "(изм.)"}
							</Typography>
							<TextWithToggle
								className={styles["comment-card__message"]}
								maxHeight={100}
								expanded={isExpandedMessage}
								onToggle={toggleMessage}
								onClose={closeMessage}
								shadowColor="grey-dark"
							>
								{message}
							</TextWithToggle>
							<div className={styles["comment-card__actions"]}>
								<Actions
									isDisliked={isDisliked}
									isLiked={isLiked}
									totalDislikes={totalDislikes}
									totalLikes={totalLikes}
									onToggleLike={toggleLike}
									onToggleDislike={toggleDislike}
								/>
								{isUserComment && (
									<Suspense fallback={null}>
										<UserActions onEdit={handleEdit} onDelete={handleDelete} />
									</Suspense>
								)}
							</div>
						</div>
					</div>
				</div>
			}
		/>
	)
})
