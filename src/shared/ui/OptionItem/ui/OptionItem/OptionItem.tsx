import { AriaRole, forwardRef, HTMLAttributes, memo, ReactNode, useRef } from 'react'
import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
//import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import { handleRippleCursorPosition } from '@/shared/lib/ripple'
import { CheckMark } from '@/shared/assets/icons'
import styles from './style.module.scss'

export type OptionItemSelectVariant = 'check-mark' | 'bg'

export interface OptionItemProps extends HTMLAttributes<HTMLLIElement> {
	className?: string
	children: ReactNode
	selected?: boolean
	disabled?: boolean
	readOnly?: boolean
	value: string
	role?: AriaRole
	centerContent?: boolean
	selectVariant?: OptionItemSelectVariant
}

export const OptionItem = memo(forwardRef((props: OptionItemProps, ref: React.ForwardedRef<HTMLLIElement>) => {
	const {
		className,
		children,
		disabled,
		selected,
		readOnly,
		value,
		role = 'option',
		id,
		centerContent,
		selectVariant = 'checkmark',
		...otherProps
	} = props

	const rippleWrapperRef = useRef<HTMLSpanElement>(null)

	const mods: Mods = {
		[styles['disabled']]: disabled,
		[styles['readonly']]: readOnly,
		[styles['selected']]: selected,
		[styles['center-content']]: centerContent
	}

	const additionalClasses: AdditionalClasses = [
		className,
		styles[selectVariant]
	]

	const handleClick = (event: React.MouseEvent) => {
		if(event.clientX) {
			handleRippleCursorPosition(rippleWrapperRef, event)
		}
	}

	return (
		<li
			className={classNames(styles['option'], additionalClasses, mods)}
			ref={ref}
			id={id}
			role={role}
			tabIndex={-1}
			data-value={value}
			aria-selected={selected ? 'true' : 'false'}
			aria-disabled={disabled || readOnly ? 'true' : undefined}
			onClick={handleClick}
			{...otherProps}
		>
			{children}
			{selected && selectVariant === 'checkmark' && <CheckMark className={styles['check-mark']} size='xs' color='primary'/>}
			{/* <RippleWrapper ref={rippleWrapperRef}/> */}
		</li>
	)
}))
