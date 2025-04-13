import { classNames } from "@/shared/helpers/classNames"
import { AvatarSkeleton } from "../../Avatar"
import { Skeleton, Skeletons } from "../../Skeleton"
import styles from "./style.module.scss"

export const DisplayReviewCardSkeleton = () => {
	return (
		<div
			className={classNames(styles["skeleton"], [styles["display-review-card"]])}
		>
			<div className={styles["display-review-card__user"]}>
				<AvatarSkeleton size="m" borderRadius="circular" />
				<Skeletons
					withContainer
					count={2}
					className={classNames(styles["skeleton__user-info"])}
				>
					<Skeleton className={styles["skeleton__text"]} />
				</Skeletons>
			</div>
			<div className={styles["display-review-card__body"]}>
				<Skeleton
					className={classNames(styles["skeleton__rating"], [
						styles["display-review-card__rating"],
					])}
                    borderRadius="full"
				/>
				<Skeletons
					count={4}
					withContainer
					className={styles["skeleton__message"]}
				>
					<Skeleton className={styles["skeleton__text"]} />
				</Skeletons>
			</div>
		</div>
	)
}
