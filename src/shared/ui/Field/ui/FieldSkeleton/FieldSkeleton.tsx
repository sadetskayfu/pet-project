import { AdditionalClasses, classNames } from '@/shared/helpers/classNames'
import { Skeleton } from '../../../Skeleton'
import { FieldBorderPlacement } from '../Field'
import styles from './style.module.scss'

type FieldSkeletonSize = 's' | 'm' | 'l'

interface FieldSkeletonProps {
	className?: string
	size?: FieldSkeletonSize
	borderPlacement?: FieldBorderPlacement
	withLabel?: boolean
}

export const FieldSkeleton = (props: FieldSkeletonProps) => {
	const { className, size = 'm', borderPlacement = 'all', withLabel } = props

	const additionalClasses: AdditionalClasses = [
		className,
		styles[size],
		borderPlacement,
	]

	return (
		<div className={classNames(styles['skeleton'], additionalClasses)}>
			{withLabel && <Skeleton borderRadius="m" className={styles['label']} />}
			<Skeleton
				borderRadius="m"
				borderPlacement={borderPlacement}
				className={styles['field']}
			/>
		</div>
	)
}
