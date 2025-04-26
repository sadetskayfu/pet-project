import { Pagination } from "@/shared/ui/Pagination"
import { memo, useCallback, useMemo, useRef, useState } from "react"
import { MovieCard } from "../MovieCard/MovieCard"
import { Skeletons } from "@/shared/ui/Skeleton"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { SearchInput } from "@/shared/ui/SearchInput"
import { Typography } from "@/shared/ui/Typography"
import { MutationMovieData } from "../../model/MutationMovieData"
import { ConfirmationDeleteDialog } from "@/widgets/ConfirmationDeleteDialog"
import { useWishedMovies } from "../../services/useWishedMovies"
import { useDeleteFromWished } from "../../services/useDeleteFromWished"
import { MovieCardSkeleton } from "@/shared/ui/MovieCard"
import styles from "./style.module.scss"

interface WishedPanelProps {
	userId: number
	isMe: boolean
	isMobile?: boolean
	totalWished: number
	sectionRef: React.RefObject<HTMLElement | null>
}

export const WishedPanel = memo((props: WishedPanelProps) => {
	const { userId, isMe, isMobile, totalWished, sectionRef } = props

	const [page, setPage] = useState<number>(1)
	const [title, setTitle] = useState<string>("")
	const [mutationMovieData, setMutationMovieData] = useState<MutationMovieData>({
		id: 0,
		title: "",
	})
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)

	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	const { data, error, isLoading } = useWishedMovies(
		userId,
		{
			page,
			title,
			limit: 12,
		},
		totalWished > 0
	)

	const handleCloseDeleteDialog = useCallback(() => {
		setIsOpenDeleteDialog(false)
	}, [])

	const { deleteFromWished, isPending } = useDeleteFromWished(
		userId,
		handleCloseDeleteDialog
	)

	const movies = data?.data

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
					onDelete={isMe ? startDelete : undefined}
				/>
			))
		}
	}, [movies, isMe, startDelete])

	return (
		<>
			<div className={styles["panel"]}>
				<ErrorAlert error={error} message="Не удалось получить желаемые медиа" />
				{totalWished === 0 ? (
					<Typography color="soft">Не добавлено ниодного желаемого медиа</Typography>
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
						{isLoading && (
							<Skeletons withContainer count={12} className={styles["movie-list"]}>
								<MovieCardSkeleton />
							</Skeletons>
						)}
						{!isLoading && movies && movies.length > 0 && (
							<div className={styles["movie-list"]}>{renderMovies}</div>
						)}
						{!isLoading && movies && movies.length === 0 && (
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
								totalItems={data.meta.total}
								size="s"
							/>
						)}
					</>
				)}
			</div>
			<ConfirmationDeleteDialog
				open={isOpenDeleteDialog}
				setOpen={setIsOpenDeleteDialog}
				title={`Вы уверены, что хотите удалить медиа ${mutationMovieData.title} из списка желаемых?`}
				returnFocus={deleteButtonRef}
				onDelete={() => deleteFromWished(mutationMovieData)}
				loading={isPending}
			/>
		</>
	)
})
