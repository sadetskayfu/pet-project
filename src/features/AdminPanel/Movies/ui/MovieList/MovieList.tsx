import { movieApi } from "@/entities/movies"
import { MovieCard } from "../MovieCard/MovieCard"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCallback, useRef, useState } from "react"
import { PaginationCursor } from "@/shared/ui/PaginationCursor"
import { Skeletons } from "@/shared/ui/Skeleton"
import { MovieCardSkeleton } from "@/shared/ui/MovieCard"
import { Typography } from "@/shared/ui/Typography"
import { UpdateMovieDialog } from "../MovieDialogs/UpdateMovieDialog"
import { ConfirmationDeleteDialog } from "@/widgets/ConfirmationDeleteDialog"
import { useDeleteMovie } from "../../services/useDeleteMovie"
import { VirtuosoGrid } from "react-virtuoso"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import styles from "./style.module.scss"

export const MovieList = ({ searchValue }: { searchValue: string }) => {
	const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState<boolean>(false)
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
	const [mutationMovieId, setMutationMovieId] = useState<number>(-1)
	const [mutationMovieTitle, setMutationMovieTitle] = useState<string>("")

	const editButtonRef = useRef<HTMLButtonElement | null>(null)
	const deleteButtonRef = useRef<HTMLButtonElement | null>(null)

	const query = useInfiniteQuery({
		...movieApi.getMoviesInfinityQueryOptions({ title: searchValue }),
	})

	const {
		data: movies,
		isLoading,
		error,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = query

	const handleCloseDeleteDialog = useCallback(() => {
		setIsOpenDeleteDialog(false)
	}, [])

	const { deleteMovie, isPending: isDeletePending } = useDeleteMovie(handleCloseDeleteDialog)

	const startEdit = useCallback(
		(movieId: number, movieTitle: string, buttonRef: React.RefObject<HTMLButtonElement | null>) => {
			editButtonRef.current = buttonRef.current
			setMutationMovieId(movieId)
			setMutationMovieTitle(movieTitle)
			setIsOpenUpdateDialog(true)
		},
		[]
	)

	const startDelete = useCallback(
		(
			movieId: number,
			movieTitle: string,
			buttonRef: React.RefObject<HTMLButtonElement | null>
		) => {
			deleteButtonRef.current = buttonRef.current
			setMutationMovieId(movieId)
			setMutationMovieTitle(movieTitle)
			setIsOpenDeleteDialog(true)
		},
		[]
	)

	return (
		<div className={styles["movie-list"]}>
			{error ? (
				<ErrorAlert error={error} message="Не удалось получить медиа" />
			) : isLoading ? (
				<Skeletons className={styles["item-list"]} withContainer count={10}>
					<MovieCardSkeleton />
				</Skeletons>
			) : movies && movies.length > 0 ? (
				<VirtuosoGrid
					listClassName={styles["item-list"]}
					itemClassName={styles["item"]}
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
							data={movie}
							onEdit={startEdit}
							onDelete={startDelete}
						/>
					)}
				/>
			) : (
				<Typography component="p" textAlign="center" color="soft" size="default">
					По вашим критериям не найдено ниодного медиа
				</Typography>
			)}

			<UpdateMovieDialog
				movieId={mutationMovieId}
				movieTitle={mutationMovieTitle}
				returnFocus={editButtonRef}
				open={isOpenUpdateDialog}
				setOpen={setIsOpenUpdateDialog}
			/>
			<ConfirmationDeleteDialog
				open={isOpenDeleteDialog}
				setOpen={setIsOpenDeleteDialog}
				onDelete={() => deleteMovie(mutationMovieId)}
				loading={isDeletePending}
				returnFocus={deleteButtonRef}
				title={`Вы уверены, что хотите удалить медиа "${mutationMovieTitle}"`}
			/>
		</div>
	)
}
