import { Pagination } from "@/shared/ui/Pagination"
import { memo, useCallback, useMemo, useRef, useState } from "react"
import { useWatchedMovies } from "../../services/useWatchedMovies"
import { MovieCard } from "../MovieCard/MovieCard"
import { Skeletons } from "@/shared/ui/Skeleton"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { SearchInput } from "@/shared/ui/SearchInput"
import { Typography } from "@/shared/ui/Typography"
import { useDeleteFromWatched } from "../../services/useDeleteFromWatched"
import { MutationMovieData } from "../../model/MutationMovieData"
import { ConfirmationDeleteDialog } from "@/widgets/ConfirmationDeleteDialog"
import { MovieCardSkeleton } from "@/shared/ui/MovieCard"
import styles from "./style.module.scss"

interface WatchedPanelProps {
	userId: number
	isMe: boolean
	isMobile?: boolean
	totalWatched: number
	sectionRef: React.RefObject<HTMLElement | null>
}

export const WatchedPanel = memo((props: WatchedPanelProps) => {
	const { userId, isMe, isMobile, totalWatched, sectionRef } = props

	const [page, setPage] = useState<number>(1)
	const [title, setTitle] = useState<string>("")
	const [mutationMovieData, setMutationMovieData] = useState<MutationMovieData>({
		id: 0,
		title: "",
	})
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)

	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	const { data, error, isLoading, isRefetching } = useWatchedMovies(
		userId,
		{
			page,
			title,
			limit: 12,
		},
		totalWatched > 0
	)

	const handleCloseDeleteDialog = useCallback(() => {
		setIsOpenDeleteDialog(false)
	}, [])

	const { deleteFromWatched, isPending } = useDeleteFromWatched(
		userId,
		handleCloseDeleteDialog
	)

	const movies = data?.data
	const total = data?.meta.total

	const startDelete = useCallback(
		(
			data: MutationMovieData,
			buttonRef: React.RefObject<HTMLButtonElement | null>
		) => {
			deleteButtonRef.current = buttonRef.current
			setMutationMovieData(data)
			setIsOpenDeleteDialog(true)
		},
		[]
	)

	const scrollToSection = useCallback(() => {
		if (sectionRef.current) {
			const top = sectionRef.current.getBoundingClientRect().top + window.scrollY
			window.scroll({ top, behavior: "smooth" })
		}
	}, [sectionRef])

	const handleChangePage = useCallback(
		(page: number) => {
			scrollToSection()
			setPage(page)
		},
		[scrollToSection]
	)

	const handleChangeTitle = useCallback((value: string) => {
		setTitle(value)
		setPage(1)
	}, [])

	const renderMovies = useMemo(() => {
		if (movies && movies?.length > 0) {
			return movies.map((movie) => (
				<MovieCard
					key={movie.id}
					data={movie}
					className={styles["list-item"]}
					isMe={isMe}
					isWatchedList
					onDelete={isMe ? startDelete : undefined}
				/>
			))
		}
	}, [movies, isMe, startDelete])

	const loading = isLoading || isRefetching

	return (
		<>
			<div className={styles["panel"]}>
				<ErrorAlert
					error={error}
					message="Не удалось получить просмотренные медиа"
				/>
				{totalWatched === 0 ? (
					<Typography color="soft">
						Не добавлено ниодного просмотренного медиа
					</Typography>
				) : (
					<>
						{!error && (
							<SearchInput
								value={title}
								onChange={handleChangeTitle}
								label="Поиск медиа по названию"
								placeholder="Введите название медиа"
								hiddenLabel
								fullWidth
							/>
						)}
						{loading && (
							<Skeletons withContainer count={12} className={styles["movie-list"]}>
								<MovieCardSkeleton />
							</Skeletons>
						)}
						{!loading && movies && movies.length > 0 && (
							<div className={styles["movie-list"]}>{renderMovies}</div>
						)}
						{!loading && movies && movies.length === 0 && (
							<Typography textAlign="center">
								По вашему запросу не найдено ниодного медиа. Попробуйте изменить
								поисковое название
							</Typography>
						)}
						{movies && (
							<Pagination
								infinity
								currentPage={page}
								onChange={handleChangePage}
								maxDisplayedPages={isMobile ? 3 : 5}
								totalItemsOnPage={12}
								totalItems={total!}
								size="s"
							/>
						)}
					</>
				)}
			</div>
			<ConfirmationDeleteDialog
				open={isOpenDeleteDialog}
				setOpen={setIsOpenDeleteDialog}
				title={`Вы уверены, что хотите удалить медиа ${mutationMovieData.title} из списка просмотренных?`}
				returnFocus={deleteButtonRef}
				onDelete={() => deleteFromWatched(mutationMovieData)}
				loading={isPending}
			/>
		</>
	)
})
