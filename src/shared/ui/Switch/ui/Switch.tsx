import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import {
	forwardRef,
	HTMLAttributes,
	InputHTMLAttributes,
	memo,
	useRef,
} from 'react'
import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import { handleRipple } from '@/shared/lib/ripple'
import styles from './style.module.scss'

type SwitchSize = 's' | 'm'
type SwitchOffset = 'left' | 'right' | 'top' | 'bottom' | 'all'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

type HTMLProps = HTMLAttributes<HTMLElement>

export interface SwitchProps extends HTMLInputProps {
	className?: string
	size?: SwitchSize
	offset?: SwitchOffset
	labelId?: string
	containerProps?: HTMLProps
}

export const Switch = memo(
	forwardRef((props: SwitchProps, ref: React.ForwardedRef<HTMLInputElement>) => {
		const {
			className,
			size = 'm',
			offset,
			labelId,
			disabled,
			tabIndex,
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
			offset && styles[offset],
		]

		const mods: Mods = {
			[styles['disabled']]: disabled,
		}

		return (
			<span
				className={classNames(styles['switch'], additionalClasses, mods)}
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
				<span className={styles['track']}>
					<span className={styles['thumb']}>
						<RippleWrapper ref={rippleWrapperRef} />
					</span>
				</span>
			</span>
		)
	})
)
