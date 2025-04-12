import { classNames } from "@/shared/helpers/classNames"
import { UserCardSkeleton } from "../UserCard/UserCardSkeleton"
import { Skeleton, Skeletons } from "@/shared/ui/Skeleton"
import styles from "./style.module.scss"

export const CommentCardSkeleton = () => {
	return (
		<div className={styles['comment-card-container']}>
			<div className={classNames(styles["skeleton"], [styles["comment-card"]])}>
				<UserCardSkeleton isComment />
				<div className={styles["comment-card__body"]}>
					<Skeleton className={styles["skeleton__text"]} />
					<Skeleton className={styles["skeleton__message"]} />
					<Skeletons className={styles["skeleton__actions"]} withContainer count={2}>
						<Skeleton
							borderRadius="circular"
							className={styles["skeleton__action-button"]}
						/>
					</Skeletons>
				</div>
			</div>
		</div>
	)
}
