import { FieldSkeleton } from '@/shared/ui/Field'
import { Skeleton, Skeletons } from '@/shared/ui/Skeleton'
import styles from './style.module.scss'

export const SkeletonForm = () => {
	return (
		<div className={styles['form']}>
			<Skeletons className={styles['fields']} count={8} withContainer>
				<FieldSkeleton withLabel />
			</Skeletons>
			<FieldSkeleton size="l" withLabel />
			<Skeletons className={styles['actions']} count={2} withContainer>
				<Skeleton className={styles['actions__btn']} />
			</Skeletons>
		</div>
	)
}
