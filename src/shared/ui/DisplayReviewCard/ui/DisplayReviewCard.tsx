import { UserAvatar } from "@/shared/ui/Avatar"
import { Typography } from "@/shared/ui/Typography"
import { DisplayStarRating } from "@/shared/ui/StarRating"
import { memo } from "react"
import { TextWithToggle } from "@/shared/ui/TextWithToggle"
import { Composite } from "@floating-ui/react"
import styles from "./style.module.scss"

interface DisplayReviewCardProps {
	userId: number
	name: string
	avatarUrl: string | null
	country: string
	rating: number
	message: string
	totalReviews: number
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
						<DisplayStarRating
							className={styles["display-review-card__rating"]}
							size="xs"
							value={rating}
							aria-label={`Рейтинг отзыва ${rating}`}
						/>
						<TextWithToggle
							getButtonLabel={(expanded) => (expanded ? "Скрыть" : "Читать все")}
							centering
							buttonColor="grey-dark"
							maxHeight={200}
							onFocus={onFocus}
                            compositeButton
                            onMouseDown={(event) => event.preventDefault()}
						>
							{message}
						</TextWithToggle>
					</div>
				</div>
			}
		/>
	)
})
