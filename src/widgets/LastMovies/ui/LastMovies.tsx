import { SectionTitleWithArrows } from "@/shared/ui/SectionTitle"
import { MovieSwiper } from "@/widgets/MovieSwiper"
import { useMovies } from "../services/useMovies"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { memo } from "react"
import { useVisibleSection } from "@/shared/hooks"

export const LastMovies = memo(() => {
	const { isVisibleSection, sectionRef } = useVisibleSection()

	const { movies, error } = useMovies(isVisibleSection)

	return (
		<div ref={sectionRef} className="section">
			<SectionTitleWithArrows label="Новинки" />
			{error ? (
				<ErrorAlert error={error} message="Ошибка при получении новых фильмов" />
			) : (
				<MovieSwiper movies={movies || []}/>
			)}
		</div>
	)
})
