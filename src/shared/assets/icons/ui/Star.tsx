import { classNames } from '@/shared/helpers/classNames/classNames'
import { IconProps } from '../types/IconProps'
import { memo } from 'react'
import styles from '../styles/style.module.scss'

export const Star = memo((props: IconProps) => {
	const { className, color = 'inherit', size = 'inherit' } = props

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[color],
		styles[size],
	]

	return (
		<svg
			className={classNames(styles['icon'], additionalClasses)}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M11.334 3.549c.21-.645 1.122-.645 1.332 0L14.2 8.272a.7.7 0 0 0 .666.483h4.966c.678 0 .96.868.411 1.267l-4.017 2.918a.7.7 0 0 0-.254.783l1.534 4.723c.21.645-.529 1.18-1.077.782l-4.017-2.918a.7.7 0 0 0-.823 0L7.57 19.228c-.548.399-1.287-.137-1.077-.782l1.534-4.723a.7.7 0 0 0-.254-.783l-4.017-2.918c-.549-.399-.267-1.267.411-1.267h4.966a.7.7 0 0 0 .666-.483z" />
		</svg>
	)
})
