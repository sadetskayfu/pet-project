import { SectionTitleWithArrows } from "@/shared/ui/SectionTitle"
import { MovieSwiper } from "@/widgets/MovieSwiper"
import { useMovies } from "../services/useMovies"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { memo } from "react"

export const LastMovies = memo(() => {
	const { movies, error } = useMovies()

	return (
		<div className="section">
			<SectionTitleWithArrows label="Новинки" />
			{error ? (
				<ErrorAlert error={error} message="Ошибка при получении новинок" />
			) : (
				<MovieSwiper movies={movies || []}/>
			)}
		</div>
	)
})
