import {
	DisplayReviewCard,
	DisplayReviewCardSkeleton,
} from "@/shared/ui/DisplayReviewCard"
import { Swiper, SwiperSlide } from "swiper/react"
import { memo, useCallback, useMemo, useState } from "react"
import { Swiper as SwiperType } from "swiper/types"
import { CardReview } from "@/entities/reviews/model"
import { classNames } from "@/shared/helpers/classNames"
import { Virtual } from "swiper/modules"
import styles from "./style.module.scss"

interface ReviewSwiperProps {
	reviews: CardReview[]
	totalReviews?: number
	className?: string
	withMovieTitle?: boolean
}

export const ReviewSwiper = memo((props: ReviewSwiperProps) => {
	const { totalReviews = 3, reviews, className, withMovieTitle } = props

	const [swiper, setSwiper] = useState<SwiperType | null>(null)

	const handleFocus = useCallback(
		(slideIndex: number) => {
			if (swiper) {
				swiper.slideTo(slideIndex)
			}
		},
		[swiper]
	)

	const renderReviews = useMemo(() => {
		if (reviews.length > 0) {
			return reviews.map((review, index) => (
				<SwiperSlide key={review.id}>
					<DisplayReviewCard
						onFocus={() => handleFocus(index)}
						userId={review.userId}
						avatarUrl={review.user.avatarSmall}
						country={review.user.country.label}
						name={review.user.displayName || review.user.email}
						totalReviews={review.user.totalReviews}
						message={review.message}
						rating={review.rating}
						movieTitle={review.movieTitle}
						totalLikes={review.totalLikes}
					/>
				</SwiperSlide>
			))
		}

		return Array(Math.min(totalReviews, 3))
		.fill(null)
		.map(() => (
			<SwiperSlide>
				<DisplayReviewCardSkeleton withMovieTitle={withMovieTitle} />
			</SwiperSlide>
		))
	}, [reviews, totalReviews, withMovieTitle, handleFocus])

	return (
		<Swiper
			onSwiper={setSwiper}
			className={classNames(styles["review-swiper"], [className])}
			spaceBetween={30}
			modules={[Virtual]}
			virtual
			breakpoints={{
				800: { slidesPerView: 2 },
				1400: { slidesPerView: 3 },
			}}
		>
			{renderReviews}
		</Swiper>
	)
})
