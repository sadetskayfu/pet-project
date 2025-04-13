import { classNames } from "@/shared/helpers/classNames"
import { Skeleton } from "../../Skeleton"
import styles from "./style.module.scss"

export const ActorCardSkeleton = () => {
	return (
		<div className={classNames(styles["skeleton"], [styles["actor-card"]])}>
			<Skeleton className={styles["actor-card__photo"]} borderRadius="circular" />
			<div className={classNames(styles['skeleton__description'], [styles["actor-card__description"]])}>
				<Skeleton className={styles["skeleton__text"]} />
				<Skeleton className={styles["skeleton__text"]} />
			</div>
		</div>
	)
}
