import { Fragment, ReactElement, ReactNode, useMemo } from 'react'
import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import styles from './style.module.scss'

type AlertVariant = 'filled' | 'outlined' | 'clear'
export type AlertSeverity = 'success' | 'info' | 'warning' | 'error'
type AlertBorderRadius = 'm' | 'l' | 'none'

interface AlertProps {
	id?: string
	className?: string
	children: ReactNode
	actions?: ReactElement | ReactElement[]
	icon?: ReactElement
	variant?: AlertVariant
	severity?: AlertSeverity
	borderRadius?: AlertBorderRadius
	fullWidth?: boolean
}

export const Alert = (props: AlertProps) => {
	const {
		id,
		className,
		children,
		actions,
		icon,
		variant = 'filled',
		severity = 'info',
		borderRadius = 'm',
		fullWidth,
	} = props

	const additionalClasses: AdditionalClasses = [
		className,
		styles[variant],
		styles[severity],
		styles[borderRadius],
	]

	const mods: Mods = {
		[styles['have-actions']]: !!actions,
		[styles['full-width']]: fullWidth,
	}

	const memoizeActions = useMemo(() => {
		if (Array.isArray(actions)) {
			return actions.map((action, index) => (
				<Fragment key={index}>{action}</Fragment>
			))
		} else {
			return actions
		}
	}, [actions])

	return (
		<div
			id={id}
			role="alert"
			className={classNames(styles['alert'], additionalClasses, mods)}
		>
			{icon && icon}
			{children}
			{actions && <div className={styles['actions']}>{memoizeActions}</div>}
		</div>
	)
}
