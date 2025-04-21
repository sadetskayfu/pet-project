import { useVisibleSection } from "@/shared/hooks"
import { useReviews } from "../services/useReviews"
import { ReviewSwiper } from "@/widgets/ReviewSwiper"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { SectionTitleWithArrows } from "@/shared/ui/SectionTitle"
import { memo } from "react"

export const PopularReviews = memo(() => {
	const { sectionRef, isVisibleSection } = useVisibleSection()

	const { reviews, error } = useReviews(isVisibleSection)

	return (
		<div ref={sectionRef} className="section">
			<SectionTitleWithArrows label="Популярные отзывы" />
			{error ? (
				<ErrorAlert error={error} message="Не удалось получить популярные отзывы" />
			) : (
				<ReviewSwiper withMovieTitle reviews={reviews || []} />
			)}
		</div>
	)
})
