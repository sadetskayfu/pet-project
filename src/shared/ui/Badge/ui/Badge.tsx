import { HTMLAttributes, memo, ReactElement } from 'react'
import { classNames, Mods } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

type BadgePosition = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
type BadgeColor = 'primary' | 'secondary' | 'green' | 'red'
type BadgeOverlap = 'circular' | 'square'
type BadgeSize = 's' | 'm' | 'l'
export type BadgeBorderColor = 'dark' | 'grey-dark'

interface BadgeProps extends HTMLAttributes<HTMLElement> {
	className?: string
	children: ReactElement
	position?: BadgePosition
	color?: BadgeColor
	size?: BadgeSize
	badgeContent?: number | string
	max?: number
	overlap?: BadgeOverlap
	visible?: boolean
	borderColor?: BadgeBorderColor
}

const getBadgeContent = (value: number | undefined, maxValue: number) => {
	if (!value) return 0

	let newValue: string | number = 0

	if (value > maxValue) {
		newValue = maxValue + '+'
	} else {
		newValue = value
	}

	return newValue
}

export const Badge = memo((props: BadgeProps) => {
	const {
		children,
		position = 'top-right',
		color = 'primary',
		overlap = 'circular',
		size = 'm',
		borderColor,
		badgeContent,
		max,
		className,
		visible,
		...otherProps
	} = props

	const additionalClasses: Array<string | undefined> = [
		styles[position],
		styles[color],
		styles[overlap],
		styles[size],
		borderColor && styles[`border-${borderColor}`]
	]

	const badgeContentIsNumber = typeof badgeContent === 'number'

	const content =
		max && badgeContentIsNumber
			? getBadgeContent(badgeContent, max)
			: badgeContent

	const mods: Mods = {
		[styles['visible']]: visible
			? visible
			: badgeContentIsNumber
				? badgeContent > 0
				: undefined,
	}

	return (
		<div className={classNames(styles['container'], [className])}>
			{children}
			<span {...otherProps} className={classNames(styles['badge'], additionalClasses, mods)}>
				{content}
			</span>
		</div>
	)
})
