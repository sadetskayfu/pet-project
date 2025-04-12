import { Skeleton, Skeletons } from '@/shared/ui/Skeleton'
import { classNames } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export const ReviewFormSkeleton = () => {
	return (
		<div className={classNames(styles['skeleton'], [styles['form']])}>
			<Skeleton className={styles['skeleton__rating']} />
			<Skeleton className={styles['skeleton__field']}/>
			<Skeletons count={2} withContainer className={styles['actions']}>
				<Skeleton className={styles['skeleton__button']} />
			</Skeletons>
		</div>
	)
}
