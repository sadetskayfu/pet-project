import {
	ButtonHTMLAttributes,
	forwardRef,
	memo,
	ReactNode,
	useRef,
} from "react"
import { RippleWrapper } from "@/shared/ui/RippleWrapper"
import {
	AdditionalClasses,
	classNames,
	Mods,
} from "@/shared/helpers/classNames"
import { handleRipple, handleRippleCursorPosition } from "@/shared/lib/ripple"
import { useToggleButtonGroupContext } from "@/shared/ui/ToggleButtonGroup"
import { mergeEventHandlers } from "@/shared/helpers/mergeEventHandlers"
import { isValueSelected } from "@/shared/helpers/isValueSelected"
import { CompositeItem } from "@floating-ui/react"
import styles from "./style.module.scss"

export type ToggleButtonSize = "xs" | "s" | "m" | "l"
export type ToggleButtonColor = "primary" | "secondary"
export type ToggleButtonBorderRadius = "s" | "m" | "full" | "none"

type HTMLButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">

export interface ToggleButtonProps extends HTMLButtonProps {
	className?: string
	size?: ToggleButtonSize
	color?: ToggleButtonColor
	borderRadius?: ToggleButtonBorderRadius
	children: ReactNode
	value: string
	disabled?: boolean
}

export const ToggleButton = memo(
	forwardRef(
		(props: ToggleButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
			const {
				className,
				size = "s",
				color = "primary",
				borderRadius = "m",
				children,
				value,
				disabled,
				tabIndex,
				onClick,
				...otherProps
			} = props

			const rippleWrapperRef = useRef<HTMLSpanElement>(null)

			const {
				selectedValue,
				onChange,
				disabled: groupDisabled,
			} = useToggleButtonGroupContext()

			const isDisabled = groupDisabled || disabled
			const isSelected = isValueSelected(value, selectedValue)

			const handleClick = (event: React.MouseEvent) => {
				onChange(value)

				if (event.clientX) {
					handleRippleCursorPosition(rippleWrapperRef, event)
				} else {
					handleRipple(rippleWrapperRef)
				}
			}

			const mods: Mods = {
				[styles["selected"]]: isSelected,
			}

			const additionalClasses: AdditionalClasses = [
				className,
				styles[size],
				styles[color],
				styles[`border-radius-${borderRadius}`],
			]

			return (
				<CompositeItem
					ref={ref}
					render={
						<button
							className={classNames(styles["button"], additionalClasses, mods)}
							disabled={isDisabled}
							tabIndex={isDisabled ? -1 : tabIndex}
							type="button"
							onClick={mergeEventHandlers([handleClick, onClick])}
							aria-pressed={isSelected ? "true" : "false"}
							{...otherProps}
						>
							{children}
							<RippleWrapper ref={rippleWrapperRef} />
						</button>
					}
				/>
			)
		}
	)
)
