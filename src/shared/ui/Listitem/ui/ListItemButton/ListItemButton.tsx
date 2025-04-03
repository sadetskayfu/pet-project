import { ButtonHTMLAttributes, forwardRef, memo, useRef } from 'react'
import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
import { handleRipple, handleRippleCursorPosition } from '@/shared/lib/ripple'
import { Indicator } from '@/shared/ui/Indicator'
import styles from './style.module.scss'

interface ListItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	disabled?: boolean
	active?: boolean
	selected?: boolean
}

export const ListItemButton = memo(
	forwardRef(
		(props: ListItemButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
			const {
				className,
				children,
				disabled,
				active,
				selected,
				role = 'listitem',
				type = 'button',
				onClick,
				...otherProps
			} = props

			const rippleWrapperRef = useRef<HTMLSpanElement | null>(null)

			const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event)

				if (event.clientX) {
					handleRippleCursorPosition(rippleWrapperRef, event)
				} else {
					handleRipple(rippleWrapperRef)
				}
			}

			const mods: Mods = {
				[styles['selected']]: selected,
				[styles['active']]: active,
			}

			const additionalClasses: AdditionalClasses = [className]

			return (
				<li className={styles['list-item']} role={role}>
					<button
						className={classNames(styles['button'], additionalClasses, mods)}
						onClick={handleClick}
						type={type}
						disabled={disabled}
						ref={ref}
						aria-pressed={active ? 'true' : undefined}
						{...otherProps}
					>
						{children}
						<RippleWrapper ref={rippleWrapperRef} />
						<Indicator
							color="secondary"
							active={active}
							position="bottom"
							weight="soft"
						/>
					</button>
				</li>
			)
		}
	)
)
