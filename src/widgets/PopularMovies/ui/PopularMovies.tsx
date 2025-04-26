import { SectionTitleWithArrows } from "@/shared/ui/SectionTitle"
import { MovieSwiper } from "@/widgets/MovieSwiper"
import { useMovies } from "../services/useMovies"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { memo } from "react"

export const PopularMovies = memo(() => {
	const { movies, error } = useMovies()

	return (
		<div className="section">
			<SectionTitleWithArrows label="Популярное медиа" />
			{error ? (
				<ErrorAlert error={error} message="Не удалось получить популярное медиа" />
			) : (
				<MovieSwiper movies={movies || []} />
			)}
		</div>
	)
})
