import { classNames } from "@/shared/helpers/classNames"
import { Skeleton, Skeletons } from "@/shared/ui/Skeleton"
import styles from "./style.module.scss"

export const UpdatePrivateSettingsFormSkeleton = () => {
	return (
		<div className={classNames(styles["skeleton"], [styles["form"]])}>
			<Skeletons
				className={styles["skeleton__switch-group"]}
				withContainer
				count={3}
			>
				<Skeleton className={styles["skeleton__switch"]} />
			</Skeletons>
			<Skeletons className={styles["buttons"]} withContainer count={2}>
				<Skeleton className={styles["skeleton__button"]} />
			</Skeletons>
		</div>
	)
}
