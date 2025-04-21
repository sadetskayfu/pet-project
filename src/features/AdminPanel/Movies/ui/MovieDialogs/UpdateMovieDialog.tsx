import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeading,
	DialogProps,
} from "@/shared/ui/Dialog"
import { Typography } from "@/shared/ui/Typography"
import { Button } from "@/shared/ui/Button"
import { useQuery } from "@tanstack/react-query"
import { movieApi } from "@/entities/movies"
import { actorApi } from "@/entities/actors"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { lazy, Suspense, useCallback } from "react"
import { MovieFormSkeleton } from "../MovieForm/MovieFormSkeleton"
import styles from "./style.module.scss"

const MovieForm = lazy(() => import("../MovieForm/MovieForm"))

interface UpdateMovieDialogProps extends Omit<DialogProps, "children"> {
	movieId: number
	movieTitle: string
}

export const UpdateMovieDialog = (props: UpdateMovieDialogProps) => {
	const { movieId, movieTitle, open, setOpen, ...otherProps } = props

	const movie = useQuery({
		...movieApi.getMovieByIdQueryOptions(movieId),
		enabled: open,
	})

	const actors = useQuery({
		...actorApi.getActorsForMovieQueryOptions(movieId),
		enabled: open,
	})

	const handleCloseDialog = useCallback(() => {
		setOpen?.(false)
	}, [setOpen])

	return (
		<Dialog open={open} setOpen={setOpen} {...otherProps}>
			<DialogContent
				containerClassName={styles["dialog"]}
				className={styles["content"]}
			>
				<DialogHeading>
					<Typography size="h5" color="primary">
						Измените медиа {movieTitle}
					</Typography>
				</DialogHeading>
				{movie.error ? (
					<DialogDescription>
						<ErrorAlert error={movie.error} message="Ошибка при получении медиа" />
					</DialogDescription>
				) : movie.isLoading || actors.isLoading ? (
					<MovieFormSkeleton />
				) : (
					<Suspense fallback={<MovieFormSkeleton />}>
						<MovieForm
							movieId={movieId}
							onSuccess={handleCloseDialog}
							defaultValues={
								movie.data && actors.data
									? {
											...movie.data,
											countries: movie.data.countries.map((country) => country.code),
											ageLimit: String(movie.data.ageLimit),
											duration: String(movie.data.duration),
											actors: actors.data.filter((actor) => actor.role === "actor"),
											directors: actors.data.filter((actor) => actor.role === "director"),
											writers: actors.data.filter((actor) => actor.role === "writer"),
										}
									: undefined
							}
						>
							<DialogClose>
								<Button variant="clear">Отмена</Button>
							</DialogClose>
						</MovieForm>
					</Suspense>
				)}
			</DialogContent>
		</Dialog>
	)
}
