import { useVisibleSection } from "@/shared/hooks"
import { useReviews } from "../services/useReviews"
import { ReviewSwiper } from "@/widgets/ReviewSwiper"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { SectionTitleWithArrows } from "@/shared/ui/SectionTitle"
import { memo } from "react"

export const LastReviews = memo(() => {
	const { sectionRef, isVisibleSection } = useVisibleSection()

	const { reviews, error } = useReviews(isVisibleSection)

	return (
		<div ref={sectionRef} className="section">
			<SectionTitleWithArrows label="Последние отзывы" />
			{error ? (
				<ErrorAlert error={error} message="Не удалось получить послезние отзывы" />
			) : (
				<ReviewSwiper withMovieTitle reviews={reviews || []} />
			)}
		</div>
	)
})
