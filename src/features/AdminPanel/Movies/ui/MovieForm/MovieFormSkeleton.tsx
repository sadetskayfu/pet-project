import { Skeleton, Skeletons } from "@/shared/ui/Skeleton"
import { classNames } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

export const MovieFormSkeleton = () => {
	return (
		<div className={classNames(styles["skeleton"], [styles["form"]])}>
			<Skeletons
				count={3}
				withContainer
				className={styles["skeleton__toggle-button-group"]}
			>
				<Skeleton className={styles["skeleton__toggle-button"]} />
			</Skeletons>
			<Skeletons className={styles["fields"]} count={8} withContainer>
				<Skeleton className={styles["skeleton__field"]} />
			</Skeletons>
			<Skeleton className={styles["skeleton__actors"]} />
			<Skeleton className={styles["skeleton__description-field"]} />
			<Skeletons className={styles["actions"]} count={2} withContainer>
				<Skeleton className={styles["skeleton__button"]} />
			</Skeletons>
		</div>
	)
}
