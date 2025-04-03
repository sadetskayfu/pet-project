import { HTMLAttributes, memo, ReactNode, useCallback } from 'react'
import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

interface LabelProps extends HTMLAttributes<HTMLElement> {
	className?: string
	children: ReactNode
	inputId?: string
	targetFocusRef?: React.RefObject<HTMLElement | null>
	component: 'label' | 'legend' | 'span'
	color?: 'soft' | 'hard'
	required?: boolean
	focused?: boolean
	errored?: boolean
	disabled?: boolean
}

export const Label = memo((props: LabelProps) => {
	const {
		className,
		children,
		id,
		inputId,
		targetFocusRef,
		component,
		color = 'hard',
		required,
		focused,
		errored,
		disabled,
		onClick,
	} = props

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLLabelElement | HTMLLegendElement>) => {
			onClick?.(event)

			if (targetFocusRef && !inputId) {
				if (document.activeElement !== targetFocusRef.current) {
					targetFocusRef.current?.focus()
				}
			}
		},
		[targetFocusRef, inputId, onClick]
	)

	const additionalClasses: AdditionalClasses = [
		className,
		styles[color]
	]

	const mods: Mods = {
		[styles['focused']]: focused,
		[styles['errored']]: errored,
		[styles['disabled']]: disabled,
		[styles['legend']]: component === 'legend',
	}

	if (component === 'label') {
		return (
			<label
				className={classNames(styles['label'], additionalClasses, mods)}
				id={id}
				htmlFor={inputId}
				onClick={handleClick}
			>
				{children}
				{required && <span aria-hidden="true"> *</span>}
			</label>
		)
	}

	if (component === 'legend') {
		return (
			<legend
				className={classNames(styles['label'], additionalClasses, mods)}
				id={id}
				onClick={handleClick}
			>
				{children}
				{required && <span aria-hidden="true"> *</span>}
			</legend>
		)
	}

	if (component === 'span') {
		return (
			<span
				className={classNames(styles['label'], additionalClasses, mods)}
				id={id}
				onClick={handleClick}
			>
				{children}
				{required && <span aria-hidden="true"> *</span>}
			</span>
		)
	}
})
