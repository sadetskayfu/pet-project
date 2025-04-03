import { classNames } from '@/shared/helpers/classNames/classNames'
import { IconProps } from '../types/IconProps'
import { memo } from 'react'
import styles from '../styles/style.module.scss'

type InfoVariant = 'filled' | 'outlined'

interface InfoProps extends IconProps {
	variant?: InfoVariant
}

export const Info = memo((props: InfoProps) => {
	const {
		className,
		color = 'inherit',
		size = 'inherit',
		variant = 'outlined',
	} = props

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
			{variant === 'filled' && (
				<>
					<path
						d="M16 8a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 13.875h-2.875v-8H13v2.25h1.875v5.75H12v2.25h8Z"
					/>
					<path
						d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 6a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 16.125h-8v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z"
					/>
				</>
			)}
			{variant === 'outlined' && (
				<>
					<path d="M17 22v-8h-4v2h2v6h-3v2h8v-2zM16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8" />
					<path d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4" />
				</>
			)}
		</svg>
	)
})
