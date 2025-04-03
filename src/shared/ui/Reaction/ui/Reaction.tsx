import { memo } from 'react'
import { classNames } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

interface ReactionProps {
	className?: string
	value: number
}

const getReaction = (value: number) => {
	switch (value) {
		case 1:
			return '😢'
		case 2:
			return '😐'
		case 3:
			return '😊'
		case 4:
			return '😎'
		case 5:
			return '🔥'
		default:
			return ''
	}
}

export const Reaction = memo((props: ReactionProps) => {
	const { className, value } = props

	return (
		<span aria-hidden='true' key={value} className={classNames(styles['reaction'], [className])}>
			{getReaction(value)}
		</span>
	)
})
