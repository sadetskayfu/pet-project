import { classNames } from '@/shared/helpers/classNames/classNames'
import { IconProps } from '../../types/IconProps'
import { memo } from 'react'
import arrowStyles from './styles.module.scss'
import styles from '../../styles/style.module.scss'

type ArrowDirection = 'left' | 'right' | 'bottom' | 'top'

interface ArrowProps extends IconProps {
	direction?: ArrowDirection
}

export const Arrow = memo((props: ArrowProps) => {
	const { className, color = 'inherit', size = 'inherit', direction = 'left' } = props

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[color],
		styles[size],
		arrowStyles[direction]
	]

	return (
		<svg
			className={classNames(styles['icon'], additionalClasses)}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill='currentColor'
				d="M17.4142 20.7071C17.8047 20.3166 17.8047 19.6834 17.4142 19.2929L10.1213 12L17.4142 4.70712C17.8047 4.3166 17.8047 3.68343 17.4142 3.29291L16.7071 2.5858C16.3166 2.19528 15.6834 2.19528 15.2929 2.5858L6.93934 10.9394C6.35355 11.5251 6.35355 12.4749 6.93934 13.0607L15.2929 21.4142C15.6834 21.8048 16.3166 21.8048 16.7071 21.4142L17.4142 20.7071Z"
			/>
		</svg>
	)
})
