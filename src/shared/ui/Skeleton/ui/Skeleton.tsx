import { AdditionalClasses, classNames } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

type SkeletonBorderRadius = 's' | 'm' | 'l' | 'full' | 'circular' | 'none'
type SkeletonBorderPlacement = 'left' | 'top' | 'right' | 'bottom' | 'all'

interface SkeletonProps {
	className?: string
	borderRadius?: SkeletonBorderRadius
	borderPlacement?: SkeletonBorderPlacement
	style?: React.CSSProperties
}

export const Skeleton = (props: SkeletonProps) => {
	const { className, borderRadius = 'm', borderPlacement = 'all', style} = props

	const additionalClasses: AdditionalClasses = [
		className,
		styles[borderRadius],
		styles[borderPlacement]
	]

	return (
		<span
			style={style}
			className={classNames(styles['skeleton'], additionalClasses)}
		></span>
	)
}
