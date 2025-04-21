import {
	ButtonHTMLAttributes,
	forwardRef,
	memo,
	ReactElement,
	Suspense,
	useRef,
} from "react"
import {
	AdditionalClasses,
	classNames,
	Mods,
} from "@/shared/helpers/classNames"
import { RippleWrapper } from "@/shared/ui/RippleWrapper"
import { handleRipple, handleRippleCursorPosition } from "@/shared/lib/ripple"
import { IndicatorLazy } from "@/shared/ui/Indicator"
import { useTabContext } from "@/shared/ui/Tabs/model/useTabContext"
import styles from "./style.module.scss"
import { CompositeItem } from "@floating-ui/react"

type TabSize = "s" | "m" | "l"
type TabIconPosition = "left" | "top" | "right" | "bottom"
export type TabVariant = "filled" | "clear"

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	id: string
	panelId: string
	value: string
	label?: string | ReactElement
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
			size = "m",
			iconPosition = "left",
			variant = "filled",
			...otherProps
		} = props

		const rippleWrapperRef = useRef<HTMLSpanElement>(null)

		const { indicator, indicatorPosition, fullWidth, onChange, selectedValue } =
			useTabContext()

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
			[styles["selected"]]: isSelected,
			[styles["full-width"]]: fullWidth,
		}

		return (
			<CompositeItem
				ref={ref}
				render={
					<button
						className={classNames(styles["tab"], additionalClasses, mods)}
						id={id}
						onClick={handleClick}
						type="button"
						role="tab"
						aria-selected={isSelected ? "true" : "false"}
						aria-controls={panelId}
						{...otherProps}
					>
						{icon && <span className={styles["icon"]}>{icon}</span>}
						{label && label}
						<RippleWrapper ref={rippleWrapperRef} />
						{indicator && (
							<Suspense fallback={null}>
								<IndicatorLazy active={isSelected} position={indicatorPosition} />
							</Suspense>
						)}
					</button>
				}
			/>
		)
	})
)
