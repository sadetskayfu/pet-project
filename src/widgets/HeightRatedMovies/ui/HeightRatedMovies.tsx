import { SectionTitleWithArrows } from "@/shared/ui/SectionTitle"
import { MovieSwiper } from "@/widgets/MovieSwiper"
import { useMovies } from "../services/useMovies"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { memo } from "react"

export const HeightRatedMovies = memo(() => {
	const { movies, error } = useMovies()

	return (
		<div className="section">
			<SectionTitleWithArrows label="Медиа с высоким рейтингом" />
			{error ? (
				<ErrorAlert
					error={error}
					message="Ошибка при получении высокооцененного медиа"
				/>
			) : (
				<MovieSwiper movies={movies || []} />
			)}
		</div>
	)
})
