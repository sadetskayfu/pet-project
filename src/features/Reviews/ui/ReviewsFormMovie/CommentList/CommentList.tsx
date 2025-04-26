import { CommentInfinityListQueryParams } from "@/entities/comments"
import { useComments } from "../../../services/useComments"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { CommentCard } from "../../ReviewCard/CommentCard/CommentCard"
import { PaginationButton } from "@/shared/ui/PaginationCursor"
import { Typography } from "@/shared/ui/Typography"
import { useReviewsContext } from "../../../context/useReviewsContext"
import { CreateCommentForm } from "../../CreateCommentForm/CreateCommentForm"
import { Button } from "@/shared/ui/Button"
import { useSelector } from "react-redux"
import { reviewActions, reviewSelectors } from "../../../model/reviewSlice"
import { useAppDispatch } from "@/shared/redux/redux"
import React, { lazy, Suspense, useCallback, useRef, useState } from "react"
import { useDelayedLoading, usePrivateHandler } from "@/shared/hooks"
import { CommentCardSkeleton } from "../../ReviewCard/CommentCard/CommentCardSkeleton"
import { Skeletons } from "@/shared/ui/Skeleton"
import { useToggleCommentLike } from "../../../services/useToggleCommentLike"
import { useToggleCommentDislike } from "../../../services/useToggleCommentDislike"
import { userSelectors } from "@/entities/user"
import { classNames } from "@/shared/helpers/classNames"
import { Virtuoso } from "react-virtuoso"
import styles from "./style.module.scss"

const UpdateCommentDialog = lazy(
	() => import("../../UpdateCommentDialog/UpdateCommentDialog")
)
const DeleteCommentDialog = lazy(
	() => import("../../DeleteCommentDialog/DeleteCommentDialog")
)

type MutationCommentData = {
	commentId: number
	message?: string
}

interface CommentListProps {
	reviewId: number
	reviewUserName: string
	totalComments: number
	queryParams: CommentInfinityListQueryParams
}

export const CommentList = (props: CommentListProps) => {
	const { reviewId, reviewUserName, totalComments, queryParams } = props

	const [mutationCommentData, setMutationCommentData] =
		useState<MutationCommentData>({ commentId: 0, message: "" })
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
	const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState<boolean>(false)

	const deleteButtonRef = useRef<HTMLButtonElement>(null)
	const editButtonRef = useRef<HTMLButtonElement>(null)
	const saveFocusRef = useRef<HTMLDivElement>(null)
	const isMutatingRef = useRef<boolean>(false)
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const openCommentFormButtonRef = useRef<HTMLButtonElement>(null)

	const {
		comments,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
	} = useComments(reviewId, queryParams, totalComments > 0)

	const dispatch = useAppDispatch()

	const { movieId } = useReviewsContext()
	const user = useSelector(userSelectors.getUser)

	const createCommentForms = useSelector(reviewSelectors.getCreateCommentForms)
	const expandedCommentMessages = useSelector(
		reviewSelectors.getExpandedCommentMessages
	)

	const { showSkeleton } = useDelayedLoading(isLoading)

	const startDeleteComment = useCallback(
		(commentId: number, buttonRef: React.RefObject<HTMLButtonElement | null>) => {
			deleteButtonRef.current = buttonRef.current
			setMutationCommentData({ commentId })
			setIsOpenDeleteDialog(true)
		},
		[]
	)

	const startUpdateComment = useCallback(
		(
			commentId: number,
			message: string,
			buttonRef: React.RefObject<HTMLButtonElement | null>
		) => {
			editButtonRef.current = buttonRef.current
			setMutationCommentData({ commentId, message })
			setIsOpenUpdateDialog(true)
		},
		[]
	)

	const { toggleCommentLike } = useToggleCommentLike(
		reviewId,
		isMutatingRef,
		queryParams
	)
	const { toggleCommentDislike } = useToggleCommentDislike(
		reviewId,
		isMutatingRef,
		queryParams
	)

	const handleToggleCommentLike = usePrivateHandler(toggleCommentLike)
	const handleToggleCommentDislike = usePrivateHandler(toggleCommentDislike)

	const handleCloseCreateCommentForm = useCallback(() => {
		dispatch(reviewActions.closeCreateCommentForm(reviewId))
		setTimeout(() => {
			openCommentFormButtonRef.current?.focus()
		}, 0)
	}, [dispatch, reviewId])

	const openCreateCommentForm = useCallback(() => {
		dispatch(reviewActions.openCreateCommentForm(reviewId))
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)
	}, [dispatch, reviewId])

	const handleOpenCreateCommentForm = usePrivateHandler(openCreateCommentForm)

	const handleChangeCreateComment = useCallback(
		(value: string) => {
			dispatch(reviewActions.onChangeCreateComment({ value, reviewId }))
		},
		[dispatch, reviewId]
	)

	return (
		<div
			ref={saveFocusRef}
			tabIndex={-1}
			aria-label={`Комментарии к отзыву пользователя ${reviewUserName}`}
			className={styles["comment-list-container"]}
		>
			{createCommentForms[reviewId] ? (
				<CreateCommentForm
					value={createCommentForms[reviewId]?.value || ""}
					inputError={createCommentForms[reviewId]?.error || null}
					inputRef={inputRef}
					onChange={handleChangeCreateComment}
					onCancel={handleCloseCreateCommentForm}
					onSuccess={handleCloseCreateCommentForm}
					movieId={movieId}
					reviewId={reviewId}
					reviewUserName={reviewUserName}
				/>
			) : (
				<Button
					className={styles["open-comment-form-button"]}
					onClick={handleOpenCreateCommentForm}
					ref={openCommentFormButtonRef}
				>
					Оставить комментарий
				</Button>
			)}
			{showSkeleton ? (
				<Skeletons
					withContainer
					className={styles["comment-list"]}
					min={1}
					max={4}
					count={totalComments}
				>
					<CommentCardSkeleton />
				</Skeletons>
			) : error ? (
				<ErrorAlert error={error} message="Ошибка при получении комментариев" />
			) : comments && comments.length > 0 ? (
				<>
					<div className={styles["comment-list"]}>
						<Virtuoso
							useWindowScroll
							totalCount={comments.length}
							data={comments}
							itemContent={(index, comment) => (
								<CommentCard
									data={comment}
									paddingTop={index === 0 ? 0 : undefined}
									isExpandedMessage={expandedCommentMessages[comment.id]}
									onToggleLike={handleToggleCommentLike}
									onToggleDislike={handleToggleCommentDislike}
									isUserComment={comment.userId === user?.id}
									onDelete={startDeleteComment}
									onEdit={startUpdateComment}
								></CommentCard>
							)}
						/>
					</div>
					<div className={styles["footer"]}>
						<PaginationButton
							className={styles['footer__pagination-button']}
							loading={isFetchingNextPage}
							onFetchNextPage={fetchNextPage}
							hasNextPage={hasNextPage}
							message="Больше комментариев нету."
						/>
						{hasNextPage && (
							<span className={styles["footer__divider"]} aria-hidden="true">
								/
							</span>
						)}
						<button
							onClick={() => dispatch(reviewActions.toggleComments(reviewId))}
							className={classNames(styles["footer__close-button"], ["text-button"])}
						>
							Закрыть
						</button>
					</div>
				</>
			) : (
				<div className={styles["no-comments-label"]}>
					<Typography
						textAlign="center"
						component="p"
						color="soft"
					>
						У этого отзыва нет ниодного комментария. Станьте первыми
					</Typography>
				</div>
			)}
			{user && (
				<Suspense>
					<DeleteCommentDialog
						open={isOpenDeleteDialog}
						setOpen={setIsOpenDeleteDialog}
						returnFocus={deleteButtonRef}
						saveReturnFocus={saveFocusRef}
						commentId={mutationCommentData.commentId}
						movieId={movieId}
						reviewId={reviewId}
					/>
				</Suspense>
			)}
			{user && (
				<Suspense>
					<UpdateCommentDialog
						returnFocus={editButtonRef}
						open={isOpenUpdateDialog}
						setOpen={setIsOpenUpdateDialog}
						defaultValues={{ message: mutationCommentData.message || "" }}
						commentId={mutationCommentData.commentId}
						reviewId={reviewId}
					/>
				</Suspense>
			)}
		</div>
	)
}
