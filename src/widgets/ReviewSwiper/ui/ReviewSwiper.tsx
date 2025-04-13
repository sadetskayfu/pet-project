import {
	DisplayReviewCard,
	DisplayReviewCardSkeleton,
} from "@/shared/ui/DisplayReviewCard"
import { Swiper, SwiperSlide } from "swiper/react"
import { memo, useCallback, useMemo, useState } from "react"
import { Swiper as SwiperType } from "swiper/types"
import { CardReview } from "@/entities/reviews/model"
import { classNames } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

interface ReviewSwiperProps {
	reviews: CardReview[]
	totalReviews: number
	className?: string
}

export const ReviewSwiper = memo((props: ReviewSwiperProps) => {
	const { totalReviews, reviews, className } = props

	const [swiper, setSwiper] = useState<SwiperType | null>(null)

	const handleButtonFocus = useCallback(
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
						onFocus={() => handleButtonFocus(index)}
						userId={review.userId}
						avatarUrl={review.user.avatarUrl}
						country={review.user.country.label}
						name={review.user.displayName || review.user.email}
						totalReviews={review.user.totalReviews}
						message={review.message}
						rating={review.rating}
					/>
				</SwiperSlide>
			))
		}

		return Array(Math.min(totalReviews, 3))
			.fill(null)
			.map((index) => (
				<SwiperSlide key={index}>
					<DisplayReviewCardSkeleton />
				</SwiperSlide>
			))
	}, [reviews, totalReviews, handleButtonFocus])

	return (
		<Swiper
			onSwiper={setSwiper}
			className={classNames(styles["review-swiper"], [className])}
			spaceBetween={30}
			breakpoints={{
				1400: { slidesPerView: 3 },
				800: { slidesPerView: 2 },
			}}
		>
			{renderReviews}
		</Swiper>
	)
})
