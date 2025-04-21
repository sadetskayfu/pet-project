import { SectionTitleWithArrows } from "@/shared/ui/SectionTitle"
import { MovieSwiper } from "@/widgets/MovieSwiper"
import { useMovies } from "../services/useMovies"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { memo } from "react"
import { useVisibleSection } from "@/shared/hooks"

export const PopularMovies = memo(() => {
	const { sectionRef, isVisibleSection } = useVisibleSection()

	const { movies, error } = useMovies(isVisibleSection)

	return (
		<div ref={sectionRef} className="section">
			<SectionTitleWithArrows label="Популярные фильмы" />
			{error ? (
				<ErrorAlert error={error} message="Не удалось получить популярные фильмы" />
			) : (
				<MovieSwiper movies={movies || []} />
			)}
		</div>
	)
})
