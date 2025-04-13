import { useReviews } from "../services/useReviews"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { memo } from "react"
import { useVisibleSection } from "@/shared/hooks"
import { ReviewSwiper } from "@/widgets/ReviewSwiper"
import { LongArrow } from "@/shared/assets/icons"
import { SectionTitle } from "@/shared/ui/SectionTitle"

interface LastReviewsForMovieProps {
	movieId: number
	totalReviews: number
}

export const LastReviewsForMovie = memo((props: LastReviewsForMovieProps) => {
	const { movieId, totalReviews } = props

	const { sectionRef, isVisibleSection } = useVisibleSection()

	const { reviews, error } = useReviews(movieId, isVisibleSection)

	return (
		<div ref={sectionRef} className="section">
			<div className='section__header'>
                <SectionTitle label="Последние отзывы"/>
				<div className='section__header-icons'>
					<LongArrow direction="left" />
					<LongArrow direction="right" />
				</div>
			</div>
			{error ? (
				<ErrorAlert
					error={error}
					message="Ошибка при получении последних отзывывов"
				/>
			) : (
				<ReviewSwiper
					reviews={reviews || []}
					totalReviews={totalReviews}
				/>
			)}
		</div>
	)
})
