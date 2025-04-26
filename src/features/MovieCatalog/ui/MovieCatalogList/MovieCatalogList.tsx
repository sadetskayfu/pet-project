import { useInfiniteQuery } from "@tanstack/react-query"
import {
	ExtendedMediaType,
	MediaType,
	movieApi,
	MovieInfinityListQueryParams,
} from "@/entities/movies"
import { Skeletons } from "@/shared/ui/Skeleton"
import { MovieCardSkeleton } from "@/shared/ui/MovieCard"
import { MovieCard } from "../MovieCard/MovieCard"
import { Typography } from "@/shared/ui/Typography"
import { PaginationCursor } from "@/shared/ui/PaginationCursor"
import { VirtuosoGrid } from "react-virtuoso"
import { useCallback, useRef, useState } from "react"
import { ReviewDialog } from "@/features/Reviews"
import { useToggleWatched } from "../../services/useToggleWatched"
import { useToggleWished } from "../../services/useToggleWished"
import { usePrivateHandler } from "@/shared/hooks"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { useSelector } from "react-redux"
import { userSelectors } from "@/entities/user"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import styles from "./style.module.scss"

export type MutationMovieData = {
	id: number
	title: string
	mediaType: MediaType
}

export const MovieCatalogList = ({
	queryParams,
	mediaType,
}: {
	queryParams: MovieInfinityListQueryParams
	mediaType: ExtendedMediaType
}) => {
	const [isOpenReviewDialog, setIsOpenReviewDialog] = useState<boolean>(false)
	const [mutationMovieData, setMutationMovieData] = useState<MutationMovieData>({
		id: -1,
		title: "",
		mediaType: 'movie'
	})

	const user = useSelector(userSelectors.getUser)

	const reviewButtonRef = useRef<HTMLButtonElement | null>(null)
	const isMutatingRef = useRef<boolean>(false)

	const {
		data: movies,
		isLoading,
		isRefetching,
		error,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		...movieApi.getMoviesInfinityQueryOptions(queryParams),
	})

	const { toggleWatched } = useToggleWatched(isMutatingRef, queryParams)
	const { toggleWished } = useToggleWished(isMutatingRef, queryParams)

	const startReview = useCallback(
		(
			data: MutationMovieData,
			buttonRef: React.RefObject<HTMLButtonElement | null>
		) => {
			reviewButtonRef.current = buttonRef.current
			setMutationMovieData(data)
			setIsOpenReviewDialog(true)
		},
		[]
	)

	const privateStartReview = usePrivateHandler(startReview)
	const privateToggleWatched = usePrivateHandler(toggleWatched)
	const privateToggleWished = usePrivateHandler(toggleWished)

	const closeReviewDialog = useCallback(() => {
		setIsOpenReviewDialog(false)
	}, [])

	const title = `Список ${mediaType === "movie" ? "фильмов" : mediaType === "series" ? "сериалов" : mediaType === "animated_film" ? "мультфильмов" : "медиа"}`

	return (
		<div className={styles["movie-list"]}>
			<SectionTitle
				component="h1"
				className={styles["movie-list__title"]}
				label={title}
			/>
			{error ? (
				<ErrorAlert error={error} message="Ошибка при получении медиа" />
			) : (isLoading || isRefetching) ? (
				<Skeletons
					count={12}
					withContainer
					className={styles["movie-list__item-list"]}
				>
					<MovieCardSkeleton />
				</Skeletons>
			) : movies && movies.length > 0 ? (
				<VirtuosoGrid
					listClassName={styles["movie-list__item-list"]}
					itemClassName={styles["movie-list__item"]}
					useWindowScroll
					totalCount={movies.length}
					data={movies}
					endReached={() => {
						if (hasNextPage && !isFetchingNextPage) {
							fetchNextPage()
						}
					}}
					components={{
						Footer: () => (
							<PaginationCursor
								hasNextPage={hasNextPage}
								loading={isFetchingNextPage}
							/>
						),
					}}
					itemContent={(_, movie) => (
						<MovieCard
							onStartReview={privateStartReview}
							onToggleWatched={privateToggleWatched}
							onToggleWished={privateToggleWished}
							data={movie}
						/>
					)}
				/>
			) : (
				<Typography textAlign="center" component="p" color="soft">
					По вашим критериями не найденого ниодного медиа. Попробуйте изменить
					фильтры
				</Typography>
			)}
			{user && (
				<ReviewDialog
					movieId={mutationMovieData.id}
					movieTitle={mutationMovieData.title}
					mediaType={mutationMovieData.mediaType}
					open={isOpenReviewDialog}
					setOpen={setIsOpenReviewDialog}
					returnFocus={reviewButtonRef}
					onSuccess={closeReviewDialog}
				/>
			)}
		</div>
	)
}
