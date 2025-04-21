import { memo, useCallback, useEffect, useId, useRef, useState } from "react"
import {
	reviewApi,
	ReviewFilterValue,
	ReviewSortValue,
} from "@/entities/reviews"
import { queryClient } from "@/shared/api"
import { ReviewList } from "./ReviewList/ReviewList"
import { ReviewFilterPanel } from "./ReviewFilterPanel/ReviewFilterPanel"
import { ReviewsContext } from "../../context/ReviewsContext"
import { useAppDispatch } from "@/shared/redux/redux"
import { reviewActions } from "../../model/reviewSlice"
import { Button } from "@/shared/ui/Button"
import { Typography } from "@/shared/ui/Typography"
import { Star } from "@/shared/assets/icons"
import { ReviewDialog } from "../ReviewDialog/ReviewDialog"
import { usePrivateHandler } from "@/shared/hooks"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import styles from "./style.module.scss"
import { MediaType } from "@/entities/movies"

interface ReviewsForMovieProps {
	movieId: number
	movieTitle: string
	totalReviews: number
	isRated?: boolean
	mediaType: MediaType
}

export const ReviewsForMovie = memo((props: ReviewsForMovieProps) => {
	const { movieId, movieTitle, totalReviews, isRated, mediaType } = props

	const [isOpenReviewDialog, setIsOpenReviewDialog] = useState<boolean>(false)
	const [filterValue, setFilterValue] = useState<ReviewFilterValue[]>(["all"])
	const [sortValue, setSortValue] = useState<ReviewSortValue>("date-asc")

	const reviewDialogId = useId()
	const reviewButtonRef = useRef<HTMLButtonElement>(null)
	const hasMutationRef = useRef<boolean>(false)
	const saveFocusRef = useRef<HTMLDivElement>(null)

	const dispatch = useAppDispatch()

	const handleChangeFilterValue = useCallback(
		(value: ReviewFilterValue[]) => {
			setFilterValue(value)
			dispatch(reviewActions.clearAll())

			if (hasMutationRef.current) {
				queryClient.invalidateQueries({
					queryKey: [reviewApi.baseKey, "list", movieId],
				})
				hasMutationRef.current = false
			}
		},
		[movieId, dispatch]
	)

	const handleChangeSortValue = useCallback(
		(value: ReviewSortValue) => {
			setSortValue(value)
			dispatch(reviewActions.clearAll())

			if (hasMutationRef.current) {
				queryClient.invalidateQueries({
					queryKey: [reviewApi.baseKey, "list", movieId],
				})
				hasMutationRef.current = false
			}
		},
		[movieId, dispatch]
	)

	const handleOpenReviewDialog = usePrivateHandler(() =>
		setIsOpenReviewDialog(true)
	)

	const handleCloseReviewDialog = useCallback(() => {
		setIsOpenReviewDialog(false)
		saveFocusRef.current?.focus()
	}, [])

	useEffect(() => {
		return () => {
			if (hasMutationRef.current) {
				queryClient.invalidateQueries({
					queryKey: [reviewApi.baseKey, "list", movieId],
				})
			}
			dispatch(reviewActions.clearAll())
		}
	}, [movieId, dispatch])

	return (
		<div ref={saveFocusRef} tabIndex={-1} className="section">
			<SectionTitle label={`Отзывы к ${mediaType === 'movie' ? 'фильму' : mediaType === 'series' ? 'сериалу' : 'мультфильму'} ${movieTitle}`} />
			<div className={styles["reviews"]}>
				{!isRated && (
					<div className={styles["reviews__rate-movie"]}>
						<Typography color="soft" size="inherit">
							Уже посмотрели?
						</Typography>
						<Button
							ref={reviewButtonRef}
							onClick={handleOpenReviewDialog}
							aria-controls={isOpenReviewDialog ? reviewDialogId : undefined}
							aria-haspopup="dialog"
							aria-expanded={isOpenReviewDialog ? "true" : "false"}
							size="m"
							variant="clear"
						>
							Оценить <Star />
						</Button>
					</div>
				)}
				<ReviewFilterPanel
					filterValue={filterValue}
					sortValue={sortValue}
					onChangeSortValue={handleChangeSortValue}
					onChangeFilterValue={handleChangeFilterValue}
				/>

				<ReviewsContext.Provider
					value={{
						movieId,
						movieTitle,
						mediaType,
						hasMutationRef,
					}}
				>
					<ReviewList
						totalReviews={totalReviews}
						queryParams={{ filters: filterValue, sort: sortValue }}
					/>
				</ReviewsContext.Provider>
				{!isRated && (
					<ReviewDialog
						open={isOpenReviewDialog}
						setOpen={setIsOpenReviewDialog}
						movieTitle={movieTitle}
						mediaType={mediaType}
						movieId={movieId}
						id={reviewDialogId}
						returnFocus={reviewButtonRef}
						onSuccess={handleCloseReviewDialog}
					/>
				)}
			</div>
		</div>
	)
})
