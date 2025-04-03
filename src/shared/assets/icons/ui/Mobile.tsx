import { classNames } from '@/shared/helpers/classNames/classNames'
import { IconProps } from '../types/IconProps'
import { memo } from 'react'
import styles from '../styles/style.module.scss'

export const Mobile = memo((props: IconProps) => {
	const { className, color = 'inherit', size = 'inherit' } = props

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[color],
		styles[size],
	]

	return (
		<svg
			className={classNames(styles['icon'], additionalClasses)}
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="currentColor"
				d="M22 4H10a2.002 2.002 0 0 0-2 2v22a2.002 2.002 0 0 0 2 2h12a2.003 2.003 0 0 0 2-2V6a2.002 2.002 0 0 0-2-2m0 2v2H10V6ZM10 28V10h12v18Z"
			/>
		</svg>
	)
})
