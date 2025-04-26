import { useReviews } from "../services/useReviews"
import { ReviewSwiper } from "@/widgets/ReviewSwiper"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { SectionTitleWithArrows } from "@/shared/ui/SectionTitle"
import { memo } from "react"

export const LastReviews = memo(() => {
	const { reviews, error } = useReviews()

	return (
		<div className="section">
			<SectionTitleWithArrows label="Последние отзывы" />
			{error ? (
				<ErrorAlert error={error} message="Не удалось получить послезние отзывы" />
			) : (
				<ReviewSwiper withMovieTitle reviews={reviews || []} />
			)}
		</div>
	)
})
