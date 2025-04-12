import { useInfiniteQuery } from "@tanstack/react-query"
import { movieApi, MovieInfinityListQueryParams } from "@/entities/movies"
import { Skeletons } from "@/shared/ui/Skeleton"
import { MovieCardSkeleton } from "@/shared/ui/MovieCard"
import { MovieCard } from "../MovieCard/MovieCard"
import { Alert } from "@/shared/ui/Alert"
import { XMark } from "@/shared/assets/icons"
import { getErrorMessage } from "@/shared/helpers/getErrorMessage"
import { Typography } from "@/shared/ui/Typography"
import { PaginationCursor } from "@/shared/ui/PaginationCursor"
import { VirtuosoGrid } from "react-virtuoso"
import { useCallback, useRef, useState } from "react"
import { ReviewDialog } from "@/features/Reviews"
import { useSelector } from "react-redux"
import { userSelectors } from "@/entities/user"
import { useLocation, useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/constants/routes"
import { ToggleWatchedBody, useToggleWatched } from "../../services/useToggleWatched"
import { ToggleWishedBody, useToggleWished } from "../../services/useToggleWished"
import styles from "./style.module.scss"

export type MutationMovieData = {
	id: number
	title: string
}

export const MovieCatalogList = ({
	queryParams,
	className,
}: {
	queryParams: MovieInfinityListQueryParams
	className?: string
}) => {
	const [isOpenReviewDialog, setIsOpenReviewDialog] = useState<boolean>(false)
	const [mutationMovieData, setMutationMovieData] = useState<MutationMovieData>({
		id: -1,
		title: "",
	})

	const reviewButtonRef = useRef<HTMLButtonElement | null>(null)

	const navigate = useNavigate()
	const location = useLocation()

	const user = useSelector(userSelectors.getUser)

	const {
		data: movies,
		isLoading,
		error,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		...movieApi.getMoviesInfinityQueryOptions(queryParams),
	})

	const { toggleWatched } = useToggleWatched(queryParams)
	const { toggleWished } = useToggleWished(queryParams)

	const redirectToAuth = useCallback(() => {
		navigate(ROUTES.AUTH, {
			state: { from: `${location.pathname}${location.search}` },
		})
	}, [navigate, location.pathname, location.search])

	const startReview = useCallback(
		(
			data: MutationMovieData,
			buttonRef: React.RefObject<HTMLButtonElement | null>
		) => {
			if (user) {
				reviewButtonRef.current = buttonRef.current
				setMutationMovieData(data)
				setIsOpenReviewDialog(true)
			} else {
				redirectToAuth()
			}
		},
		[user, redirectToAuth]
	)

	const handleToggleWatched = useCallback((body: ToggleWatchedBody) => {
		if(user) {
			toggleWatched(body)
		} else {
			redirectToAuth()
		}
	}, [redirectToAuth, toggleWatched, user])

	const handleToggleWished = useCallback((body: ToggleWishedBody) => {
		if(user) {
			toggleWished(body)
		} else {
			redirectToAuth()
		}
	}, [redirectToAuth, toggleWished, user])

	return (
		<div className={className}>
			{error ? (
				<Alert
					variant="outlined"
					severity="error"
					icon={<XMark size="m" variant="outlined" />}
				>
					{getErrorMessage(error, "Error while getting movies. Try reload page")}
				</Alert>
			) : isLoading ? (
				<Skeletons count={10} withContainer className={styles["list"]}>
					<MovieCardSkeleton />
				</Skeletons>
			) : movies && movies.length > 0 ? (
				<>
					<VirtuosoGrid
						listClassName={styles["list"]}
						itemClassName={styles["item"]}
						useWindowScroll
						totalCount={movies.length}
						data={movies}
						itemContent={(_, movie) => (
							<MovieCard
								key={movie.id}
								onStartReview={startReview}
								onToggleWatched={handleToggleWatched}
								onToggleWished={handleToggleWished}
								data={movie}
							/>
						)}
					/>
					<PaginationCursor
						onFetchNextPage={fetchNextPage}
						hasNextPage={hasNextPage}
						loading={isFetchingNextPage}
					/>
				</>
			) : (
				<Typography textAlign="center" component="p" color="soft">
					Not a single movie was found for your search. Try changing the filters
				</Typography>
			)}
			<ReviewDialog
				movieId={mutationMovieData.id}
				movieTitle={mutationMovieData.title}
				open={isOpenReviewDialog}
				setOpen={setIsOpenReviewDialog}
				returnFocus={reviewButtonRef}
				onSuccess={() => setIsOpenReviewDialog(false)}
			/>
		</div>
	)
}
