import { classNames } from '@/shared/helpers/classNames/classNames'
import { IconProps } from '../../types/IconProps'
import { memo } from 'react'
import arrowStyles from './styles.module.scss'
import styles from '../../styles/style.module.scss'

type ArrowDirection = 'left' | 'right' | 'bottom' | 'top'

interface LongArrowProps extends IconProps {
	direction?: ArrowDirection
}

export const LongArrow = memo((props: LongArrowProps) => {
	const {
		className,
		color = 'inherit',
		size = 'inherit',
		direction = 'left',
	} = props

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[color],
		styles[size],
		arrowStyles[direction],
	]

	return (
		<svg
			className={classNames(styles['icon'], additionalClasses)}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="#64df30"
				d="m14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6L4 16z"
			/>
		</svg>
	)
})
