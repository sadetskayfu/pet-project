import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
import {
	ForwardedRef,
	forwardRef,
	HTMLAttributes,
	InputHTMLAttributes,
	memo,
	ReactElement,
	useRef,
} from 'react'
import { CheckMark } from '@/shared/assets/icons'
import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import { handleRipple } from '@/shared/lib/ripple'
import styles from './style.module.scss'

export type CheckboxVariant = 'filled' | 'outlined'
export type CheckboxSize = 's' | 'm'
export type CheckboxColor = 'primary' | 'red'
type CheckboxOffset =
	| 'left'
	| 'right'
	| 'top'
	| 'bottom'
	| 'all'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
type HTMLProps = HTMLAttributes<HTMLElement>

export interface CheckboxProps extends HTMLInputProps {
	className?: string
	size?: CheckboxSize
	variant?: CheckboxVariant
	color?: CheckboxColor
	offset?: CheckboxOffset
	labelId?: string
	icon?: ReactElement
	checkedIcon?: ReactElement
	containerProps?: HTMLProps
}

export const Checkbox = memo(forwardRef((props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		className,
		size = 'm',
		variant = 'filled',
		color = 'primary',
		offset,
		labelId,
		disabled,
		icon,
		tabIndex = 0,
		checkedIcon,
		onChange,
		containerProps,
		...otherProps
	} = props

	const rippleWrapperRef = useRef<HTMLSpanElement>(null)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(event)
		handleRipple(rippleWrapperRef, true)
	}

	const additionalClasses: AdditionalClasses = [
		className,
		styles[size],
		styles[variant],
		styles[color],
		offset && styles[offset],
	]

	const mods: Mods = {
		[styles['disabled']]: disabled,
		[styles['with-custom-icon']]: !!checkedIcon
	}

	return (
		<span
			className={classNames(styles['checkbox'], additionalClasses, mods)}
			{...containerProps}
		>
			<input
				ref={ref}
				className={styles['input']}
				type="checkbox"
				onChange={handleChange}
				tabIndex={disabled ? -1 : tabIndex}
				disabled={disabled}
				aria-labelledby={labelId ? labelId : undefined}
				{...otherProps}
			/>
			<span className={styles['body']}>
				{icon ? (
					<span className={styles['icon']}>{icon}</span>
				) : (
					<span className={styles['blank']}></span>
				)}
				{checkedIcon ? (
					<span className={styles['checked-icon']}>{checkedIcon}</span>
				) : (
					<CheckMark className={styles['checked-icon']} />
				)}
			</span>
			<RippleWrapper ref={rippleWrapperRef} />
		</span>
	)
}))
