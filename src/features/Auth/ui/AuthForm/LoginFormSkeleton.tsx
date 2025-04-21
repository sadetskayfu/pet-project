import { Skeleton, Skeletons } from '@/shared/ui/Skeleton'
import { classNames } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export const LoginFormSkeleton = () => {
	return (
		<div className={classNames(styles['skeleton'], [styles['form']])}>
			<Skeletons count={2}>
				<Skeleton className={styles['skeleton__field']} />
			</Skeletons>
			<Skeleton className={styles['skeleton__button']}/>
		</div>
	)
}
