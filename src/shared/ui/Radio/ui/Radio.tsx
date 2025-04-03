import {
	forwardRef,
	HTMLAttributes,
	InputHTMLAttributes,
	memo,
	useRef,
} from 'react'
import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import { handleRipple } from '@/shared/lib/ripple'
import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import styles from './style.module.scss'

export type RadioSize = 's' | 'm'
export type RadioVariant = 'filled' | 'outlined'
type RadioOffset = 'left' | 'right' | 'top' | 'bottom' | 'all'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
type HTMLProps = HTMLAttributes<HTMLElement>

interface RadioProps extends HTMLInputProps {
	className?: string
	size?: RadioSize
	variant?: RadioVariant
	offset?: RadioOffset
	labelId?: string
	containerProps?: HTMLProps
}

export const Radio = memo(
	forwardRef((props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
		const {
			className,
			size = 'm',
			variant = 'filled',
			offset,
			labelId,
			disabled,
			checked,
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
			offset && styles[offset],
		]

		const mods: Mods = {
			[styles['disabled']]: disabled,
			[styles['checked']]: checked,
		}

		return (
			<span
				className={classNames(styles['radio'], additionalClasses, mods)}
				{...containerProps}
			>
				<input
					ref={ref}
					className={styles['input']}
					type="radio"
					onChange={handleChange}
					checked={checked}
					tabIndex={disabled ? -1 : 0}
					disabled={disabled}
					aria-labelledby={labelId ? labelId : undefined}
					{...otherProps}
				/>
				<span className={styles['body']}>
				</span>
				<RippleWrapper ref={rippleWrapperRef} />
			</span>
		)
	})
)
