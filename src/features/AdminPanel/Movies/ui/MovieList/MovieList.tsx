import { movieApi } from '@/entities/movies'
import { MovieCard } from '../MovieCard/MovieCard'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Alert } from '@/shared/ui/Alert'
import { XMark } from '@/shared/assets/icons'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { PaginationCursor } from '@/shared/ui/PaginationCursor'
import { Skeletons } from '@/shared/ui/Skeleton'
import { MovieCardSkeleton } from '@/shared/ui/MovieCard'
import { Typography } from '@/shared/ui/Typography'
import { UpdateMovieDialog } from '../MovieDialogs/UpdateMovieDialog'
import { ConfirmationDeleteDialog } from '@/widgets/ConfirmationDeleteDialog'
import { useDeleteMovie } from '../../model/useDeleteMovie'
import styles from './style.module.scss'

export const MovieList = ({ searchValue }: { searchValue: string }) => {
	const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState<boolean>(false)
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
	const [mutationMovieId, setMutationMovieId] = useState<number>(-1)
	const [mutationMovieTitle, setMutationMovieTitle] = useState<string>('')

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

	const { deleteMovie, isPending: isDeletePending } = useDeleteMovie()

	const startEdit = useCallback(
		(movieId: number, buttonRef: React.RefObject<HTMLButtonElement>) => {
			editButtonRef.current = buttonRef.current
			setMutationMovieId(movieId)
			setIsOpenUpdateDialog(true)
		},
		[]
	)

	const startDelete = useCallback(
		(
			movieId: number,
			movieTitle: string,
			buttonRef: React.RefObject<HTMLButtonElement>
		) => {
			deleteButtonRef.current = buttonRef.current
			setMutationMovieId(movieId)
			setMutationMovieTitle(movieTitle)
			setIsOpenDeleteDialog(true)
		},
		[]
	)

	const renderMovieCards = useMemo(
		() =>
			movies?.map((movie) => {
				const { cardImgUrl, genres, countries, ...otherProps } = movie
				return (
					<li key={movie.id}>
						<MovieCard
							src={cardImgUrl}
							countries={countries.map((country) => country.code)}
							genres={genres.map((genre) => genre.name)}
							onEdit={startEdit}
							onDelete={startDelete}
							{...otherProps}
						/>
					</li>
				)
			}),
		[movies, startEdit, startDelete]
	)

	if (error) {
		return (
			<Alert
				variant="outlined"
				severity="error"
				icon={<XMark size="m" variant="outlined" />}
			>
				{getErrorMessage(error, 'Error while getting movies. Try reload page')}
			</Alert>
		)
	}

	return (
		<>
			{isLoading ? (
				<Skeletons className={styles['list']} withContainer count={6}>
					<MovieCardSkeleton />
				</Skeletons>
			) : renderMovieCards && renderMovieCards?.length > 0 ? (
				<>
					<ul className={styles['list']}>{renderMovieCards}</ul>
					<PaginationCursor
						onFetchNextPage={fetchNextPage}
						loading={isFetchingNextPage}
						hasNextPage={hasNextPage}
					/>
				</>
			) : (
				<Typography component='p' textAlign="center" color="soft" size="default">
					No movies were found for your search. Enter a different value, or create
					your first movie.
				</Typography>
			)}
			<UpdateMovieDialog
				movieId={mutationMovieId}
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
				title={`Do you really want to delete movie "${mutationMovieTitle}"`}
			/>
		</>
	)
}
