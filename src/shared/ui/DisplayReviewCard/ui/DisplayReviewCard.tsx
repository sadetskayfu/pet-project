import { UserAvatar } from "@/shared/ui/Avatar"
import { Typography } from "@/shared/ui/Typography"
import { DisplayStarRating } from "@/shared/ui/StarRating"
import { memo } from "react"
import { TextWithToggle } from "@/shared/ui/TextWithToggle"
import { Composite } from "@floating-ui/react"
import { Heart } from "@/shared/assets/icons"
import styles from "./style.module.scss"

interface DisplayReviewCardProps {
	userId: number
	name: string
	avatarUrl: string | null
	country: string
	rating: number
	message: string
	totalReviews: number
	totalLikes: number
	movieTitle?: string
	onFocus?: (event: React.FocusEvent<HTMLElement>) => void
}

export const DisplayReviewCard = memo((props: DisplayReviewCardProps) => {
	const {
		userId,
		avatarUrl,
		country,
		name,
		message,
		totalReviews,
		rating,
		movieTitle,
		totalLikes,
		onFocus,
	} = props

	return (
		<Composite
			orientation="horizontal"
			render={
				<div className={styles["display-review-card"]}>
					<div className={styles["display-review-card__user"]}>
						<UserAvatar
							name={name}
							avatarUrl={avatarUrl}
							userId={userId}
							totalReviews={totalReviews}
							size="m"
							badgeBorderColor="dark"
							onFocus={onFocus}
						/>
						<div className={styles["display-review-card__user-info"]}>
							<Typography color="hard">{name}</Typography>
							<Typography>{country}</Typography>
						</div>
					</div>
					<div className={styles["display-review-card__body"]}>
						{movieTitle && (
							<span className={styles["display-review-card__movie-title"]}>
								Отзыв на {movieTitle}
							</span>
						)}
						<TextWithToggle
							getButtonLabel={(expanded) => (expanded ? "Скрыть" : "Читать все")}
							centering
							buttonColor="grey-dark"
							maxHeight={150}
							minHeight={150}
							onFocus={onFocus}
							compositeButton
							onMouseDown={(event) => event.preventDefault()}
						>
							{message}
						</TextWithToggle>
						<DisplayStarRating
							className={styles["display-review-card__rating"]}
							size="xs"
							value={rating}
							aria-label={`Рейтинг отзыва ${rating}`}
						/>
						<span
							aria-label={`У отзыва ${totalLikes} лайков`}
							className={styles["display-review-card__likes"]}
						>
							<Heart size="l" variant="filled" />
							<Typography size="helper">
								{totalLikes}
							</Typography>
						</span>
					</div>
				</div>
			}
		/>
	)
})
