import { FieldSkeleton } from '@/shared/ui/Field'
import { Skeleton, Skeletons } from '@/shared/ui/Skeleton'
import styles from './style.module.scss'

export const LoginFormSkeleton = () => {
	return (
		<div className={styles['form']}>
			<Skeletons count={2}>
				<FieldSkeleton withLabel />
			</Skeletons>
			<Skeleton className={styles['skeleton-button']}/>
		</div>
	)
}
