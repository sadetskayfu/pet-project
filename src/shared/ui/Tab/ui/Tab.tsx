import {
	ButtonHTMLAttributes,
	forwardRef,
	memo,
	ReactElement,
	Suspense,
	useRef,
} from 'react'
import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import { handleRipple, handleRippleCursorPosition } from '@/shared/lib/ripple'
import { IndicatorLazy } from '@/shared/ui/Indicator'
import { useTabContext } from '@/shared/ui/Tabs/model/useTabContext'
import { CompositeItem } from '@floating-ui/react'
import styles from './style.module.scss'

type TabSize = 'm' | 'l'
type TabIconPosition = 'left' | 'top' | 'right' | 'bottom'
export type TabVariant = 'filled' | 'clear'

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	id: string
	panelId: string
	value: string
	label?: string
	icon?: ReactElement
	size?: TabSize
	variant?: TabVariant
	iconPosition?: TabIconPosition
}

export const Tab = memo(
	forwardRef((props: TabProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
		const {
			className,
			id,
			panelId,
			value,
			label,
			icon,
			size = 'm',
			iconPosition = 'left',
			variant = 'filled',
			...otherProps
		} = props

		const rippleWrapperRef = useRef<HTMLSpanElement>(null)

		const {
			indicator,
			indicatorPosition,
			fullWidth,
			onChange,
			selectedValue,
		} = useTabContext()

		const isSelected = selectedValue === value

		const handleClick = (event: React.MouseEvent) => {
			if (!isSelected) {
				onChange(value)

				if (event.clientX) {
					handleRippleCursorPosition(rippleWrapperRef, event)
				} else {
					handleRipple(rippleWrapperRef)
				}
			}
		}

		const additionalClasses: AdditionalClasses = [
			className,
			styles[size],
			styles[iconPosition],
			styles[variant],
		]

		const mods: Mods = {
			[styles['selected']]: isSelected,
			[styles['full-width']]: fullWidth
		}

		return (
			<CompositeItem
				render={
					<button
						className={classNames(styles['tab'], additionalClasses, mods)}
						ref={ref}
						id={id}
						onClick={handleClick}
						type="button"
						role="tab"
						aria-selected={isSelected ? 'true' : 'false'}
						aria-controls={panelId}
						{...otherProps}
					>
						{icon && <span className={styles['icon']}>{icon}</span>}
						{label && label}
						<RippleWrapper ref={rippleWrapperRef} />
						{indicator && (
							<Suspense fallback="">
								<IndicatorLazy active={isSelected} position={indicatorPosition} />
							</Suspense>
						)}
					</button>
				}
			/>
		)
	})
)
