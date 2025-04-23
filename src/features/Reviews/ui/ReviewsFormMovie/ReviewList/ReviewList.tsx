import { ReviewInfinityListQueryParams } from "@/entities/reviews"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { Virtuoso } from "react-virtuoso"
import { Typography } from "@/shared/ui/Typography"
import { PaginationButton } from "@/shared/ui/PaginationCursor"
import { useReviews } from "../../../services/useReviews"
import { CommentList } from "../CommentList/CommentList"
import { ReviewCard } from "../../ReviewCard/ReviewCard/ReviewCard"
import { useReviewsContext } from "../../../context/useReviewsContext"
import { useSelector } from "react-redux"
import { userSelectors } from "@/entities/user"
import { reviewSelectors } from "../../../model/reviewSlice"
import { useToggleReviewLike } from "../../../services/useToggleReviewLike"
import { useToggleReviewDislike } from "../../../services/useToggleReviewDislike"
import React, { useCallback, useMemo, useRef, useState } from "react"
import {
	useDelayedLoading,
	usePrivateHandler,
	useVisibleSection,
} from "@/shared/hooks"
import { ReviewCardSkeleton } from "../../ReviewCard/ReviewCard/ReviewCardSkeleton"
import { ReviewDialog } from "../../ReviewDialog/ReviewDialog"
import { ConfirmationDeleteDialog } from "@/widgets/ConfirmationDeleteDialog"
import { useDeleteReview } from "../../../services/useDeleteReview"
import { useMergeRefs } from "@floating-ui/react"
import styles from "./style.module.scss"

export type MutationReviewData = {
	reviewId: number
	message?: string
	rating?: number
}

interface ReviewListProps {
	queryParams: ReviewInfinityListQueryParams
	totalReviews: number
}

export const ReviewList = (props: ReviewListProps) => {
	const { queryParams, totalReviews } = props

	const [mutationReviewData, setMutationReviewData] =
		useState<MutationReviewData>({ reviewId: 0, message: "", rating: 0 })
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
	const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState<boolean>(false)

	const saveFocusRef = useRef<HTMLDivElement>(null)
	const deleteButtonRef = useRef<HTMLButtonElement>(null)
	const editButtonRef = useRef<HTMLButtonElement>(null)
	const isMutatingRef = useRef<boolean>(false)

	const user = useSelector(userSelectors.getUser)
	const openComments = useSelector(reviewSelectors.getOpenComments)
	const expandedReviewMessages = useSelector(
		reviewSelectors.getExpandedReviewMessages
	)

	const { sectionRef, isVisibleSection } = useVisibleSection()

	const { movieId, movieTitle, mediaType, hasMutationRef } = useReviewsContext()

	const {
		reviews,
		isLoading,
		error,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useReviews(movieId, queryParams, isVisibleSection)

	const { showSkeleton } = useDelayedLoading(isLoading, 500)

	const { toggleReviewLike } = useToggleReviewLike(
		movieId,
		isMutatingRef,
		hasMutationRef,
		queryParams
	)
	const { toggleReviewDislike } = useToggleReviewDislike(
		movieId,
		isMutatingRef,
		hasMutationRef,
		queryParams
	)

	const handleToggleReviewLike = usePrivateHandler(toggleReviewLike)
	const handleToggleReviewDislike = usePrivateHandler(toggleReviewDislike)

	const startEdit = useCallback(
		(
			data: MutationReviewData,
			buttonRef: React.RefObject<HTMLButtonElement | null>
		) => {
			editButtonRef.current = buttonRef.current
			setMutationReviewData(data)
			setIsOpenUpdateDialog(true)
		},
		[]
	)

	const startDelete = useCallback(
		(reviewId: number, buttonRef: React.RefObject<HTMLButtonElement | null>) => {
			deleteButtonRef.current = buttonRef.current
			setMutationReviewData({ message: "", rating: 0, reviewId })
			setIsOpenDeleteDialog(true)
		},
		[]
	)

	const handleCloseUpdateDialog = useCallback(() => {
		setIsOpenUpdateDialog(false)
	}, [])

	const handleCloseDeleteDialog = useCallback(() => {
		setIsOpenDeleteDialog(false)
		saveFocusRef.current?.focus()
	}, [])

	const { deleteReview, isPending: isDeletePending } = useDeleteReview(
		handleCloseDeleteDialog
	)

	const handleDeleteReview = useCallback(() => {
		deleteReview({ movieTitle, reviewId: mutationReviewData.reviewId })
	}, [deleteReview, movieTitle, mutationReviewData.reviewId])

	const totalSkeletons = useMemo(
		() => Math.max(1, Math.min(totalReviews, 5)),
		[totalReviews]
	)

	return (
		<div
			aria-label={`Список отзывов для медиа ${movieTitle}`}
			tabIndex={-1}
			ref={useMergeRefs([sectionRef, saveFocusRef])}
			className={styles["review-list-container"]}
		>
			{isVisibleSection &&
				(error ? (
					<ErrorAlert error={error} message="Ошибка при получении отзывов" />
				) : showSkeleton || (reviews && reviews.length > 0) ? (
					<>
						<Virtuoso
							useWindowScroll
							totalCount={showSkeleton ? totalSkeletons : reviews?.length}
							data={showSkeleton ? Array(totalSkeletons).fill(null) : reviews}
							itemContent={(_, review) =>
								showSkeleton ? (
									<ReviewCardSkeleton />
								) : (
									<ReviewCard
										key={review.id}
										data={review}
										className={styles["review-card"]}
										isUserReview={review.userId === user?.id}
										isOpenComments={openComments[review.id]}
										isExpandedMessage={expandedReviewMessages[review.id]}
										onToggleLike={handleToggleReviewLike}
										onToggleDislike={handleToggleReviewDislike}
										onEdit={review.userId === user?.id ? startEdit : undefined}
										onDelete={review.userId === user?.id ? startDelete : undefined}
									>
										<CommentList
											totalComments={review.totalComments}
											reviewUserName={review.user.displayName || review.user.email}
											queryParams={{}}
											reviewId={review.id}
										/>
									</ReviewCard>
								)
							}
						/>
						{!showSkeleton && (
							<PaginationButton
								loading={isFetchingNextPage}
								onFetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								message="Больше отзывов нету"
							/>
						)}
					</>
				) : (
					<div>
											<Typography textAlign="center" component="p" color="soft">
						{totalReviews === 0
							? "Нету ниодного отзыва. Станьте первыми"
							: "По вашим критериям не найдено ниодного отзыва. Попробуйте изменить фильтры"}
					</Typography>
					</div>
				))}
			{user && (
				<ReviewDialog
					movieTitle={movieTitle}
					movieId={movieId}
					mediaType={mediaType}
					reviewId={mutationReviewData.reviewId}
					defaultValues={{
						message: mutationReviewData.message || "",
						rating: mutationReviewData.rating || 0,
					}}
					returnFocus={editButtonRef}
					open={isOpenUpdateDialog}
					setOpen={setIsOpenUpdateDialog}
					onSuccess={handleCloseUpdateDialog}
				/>
			)}
			{user && (
				<ConfirmationDeleteDialog
					title={`Вы уверены, что хотите удалить свой отзыв к медиа ${movieTitle}?`}
					open={isOpenDeleteDialog}
					setOpen={setIsOpenDeleteDialog}
					returnFocus={deleteButtonRef}
					onDelete={handleDeleteReview}
					loading={isDeletePending}
				/>
			)}
		</div>
	)
}
