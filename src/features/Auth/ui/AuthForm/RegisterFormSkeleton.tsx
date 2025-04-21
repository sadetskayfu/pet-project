import { Skeleton, Skeletons } from '@/shared/ui/Skeleton'
import { classNames } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export const RegisterFormSkeleton = () => {
    return (
		<div className={classNames(styles['skeleton'], [styles['form']])}>
			<Skeletons count={4}>
				<Skeleton className={styles['skeleton__field']} />
			</Skeletons>
			<Skeleton className={styles['skeleton__button']}/>
		</div>
    )
}