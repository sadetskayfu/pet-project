import { classNames } from '@/shared/helpers/classNames'
import { Skeleton } from '../../Skeleton'
import styles from './style.module.scss'

export const ActorCardSkeleton = ({ fullWidth }: { fullWidth?: boolean }) => {
	return (
		<div
			className={classNames(styles['skeleton'], [], {
				[styles['full-width']]: fullWidth,
			})}
		>
			<Skeleton
				borderPlacement="top"
				className={styles['skeleton__photo']}
				borderRadius="m"
			/>
			<Skeleton
				borderPlacement="bottom"
				className={styles['skeleton__desc']}
				borderRadius="m"
			/>
		</div>
	)
}
