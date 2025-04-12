import { Skeleton, Skeletons } from "@/shared/ui/Skeleton"
import { UserCardSkeleton } from "../UserCard/UserCardSkeleton"
import { classNames } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

export const ReviewCardSkeleton = () => {
	return (
		<div className={classNames(styles["skeleton"], [styles["review-card"]])}>
			<UserCardSkeleton />
			<div className={styles["body"]}>
				<div className={styles["body__header"]}>
					<Skeleton className={styles["skeleton__rating"]} />
					<Skeleton className={styles["skeleton__text"]} />
				</div>
				<Skeleton className={styles["skeleton__message"]} />
				<Skeletons className={styles["skeleton__actions"]} withContainer count={3}>
					<Skeleton
						borderRadius="circular"
						className={styles["skeleton__action-button"]}
					/>
				</Skeletons>
			</div>
		</div>
	)
}
