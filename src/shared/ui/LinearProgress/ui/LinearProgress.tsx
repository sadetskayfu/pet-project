import { classNames } from '@/shared/helpers/classNames'
import { useEffect, useRef } from 'react'
import styles from './style.module.scss'

type LinearProgressColor = 'primary' | 'secondary'

type AriaAttributes = {
	'aria-label'?: string
}

interface LinearProgressProps extends AriaAttributes {
	className?: string
	color?: LinearProgressColor
	label?: string | number
	value?: number
	maxValue?: number
	minValue?: number
}

export const LinearProgress = (props: LinearProgressProps) => {
	const { className, color = 'primary', label, value, maxValue = 100, minValue = 0, ...otherProps } = props

	const fillRef = useRef<HTMLSpanElement>(null)

	const isControlled = typeof value === 'number'

	useEffect(() => {
		const fill = fillRef.current

		if (isControlled && fill) {
			fill.style.transform = `translateX(${-100 + ((value - minValue) / (maxValue - minValue) * 100)}%)`
		}
	}, [value, isControlled, maxValue, minValue])

	const additionalClasses: Array<string | undefined> = [className, styles[color]]

	const mods: Record<string, boolean | undefined> = {
		[styles['controlled']]: isControlled,
	}

	return (
		<div
			className={classNames(styles['progress'], additionalClasses, mods)}
			role="progressbar"
			aria-valuemax={isControlled ? maxValue : undefined}
			aria-valuemin={isControlled ? minValue : undefined}
			aria-valuenow={isControlled ? value : undefined}
			{...otherProps}
		>
			<span className={styles['track']}>
				<span ref={fillRef} className={styles['fill']}></span>
			</span>
			{label != null && <span aria-hidden='true'>{label}</span>}
		</div>
	)
}
