import { useReviews } from "../services/useReviews"
import { ReviewSwiper } from "@/widgets/ReviewSwiper"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { SectionTitleWithArrows } from "@/shared/ui/SectionTitle"
import { memo } from "react"

export const PopularReviews = memo(() => {
	const { reviews, error } = useReviews()

	return (
		<div className="section">
			<SectionTitleWithArrows label="Популярные отзывы" />
			{error ? (
				<ErrorAlert error={error} message="Не удалось получить популярные отзывы" />
			) : (
				<ReviewSwiper withMovieTitle reviews={reviews || []} />
			)}
		</div>
	)
})
