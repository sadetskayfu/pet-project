import {
	AdditionalClasses,
	classNames,
	Mods,
} from "@/shared/helpers/classNames"
import {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	cloneElement,
	forwardRef,
	HTMLAttributes,
	memo,
	ReactElement,
	useRef,
} from "react"
import { AvatarProps } from "@/shared/ui/Avatar"
import { XMark } from "@/shared/assets/icons"
import { RippleWrapper } from "@/shared/ui/RippleWrapper"
import { handleRipple, handleRippleCursorPosition } from "@/shared/lib/ripple"
import { Link } from "react-router-dom"
import { Typography } from "@/shared/ui/Typography"
import styles from "./style.module.scss"

type ChipVariant = "filled" | "outlined"
type ChipColor = "primary" | "secondary"
type ChipSize = "s" | "m"

type HTMLProps = HTMLAttributes<HTMLElement>
type HTMLButtonProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	keyof HTMLProps | "type" | "disabled"
>
type HTMLLinkProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof HTMLProps | "href"
>

interface ChipProps extends HTMLProps {
	variant?: ChipVariant
	color?: ChipColor
	size?: ChipSize
	label: string
	tabIndex?: number
	disabled?: boolean
	to?: string
	href?: string
	avatar?: ReactElement<AvatarProps>
	icon?: ReactElement
	onClose?: (event: any) => void
	type?: "submit" | "reset" | "button"
	buttonProps?: HTMLButtonProps
	linkProps?: HTMLLinkProps
}

export const Chip = memo(
	forwardRef(
		(
			props: ChipProps,
			ref: React.ForwardedRef<
				HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
			>
		) => {
			const {
				className,
				variant = "filled",
				color = "primary",
				size = "s",
				disabled,
				tabIndex = 0,
				to,
				href,
				onClick,
				onClose,
				buttonProps,
				linkProps,
				...otherProps
			} = props

			const rippleWrapperRef = useRef<HTMLSpanElement>(null)

			const handleKeyDown = (event: React.KeyboardEvent) => {
				if (event.key === "Backspace" && onClose) {
					event.preventDefault()
					onClose(event)
				}
			}

			const handleClick = (event: React.MouseEvent<HTMLElement>) => {
				onClick?.(event)

				if (event.clientX) {
					handleRippleCursorPosition(rippleWrapperRef, event)
				} else {
					handleRipple(rippleWrapperRef)
				}
			}

			const mods: Mods = {
				[styles["clickable"]]: Boolean(onClick || to || href),
				[styles["disabled"]]: disabled,
			}

			const additionalClasses: AdditionalClasses = [
				className,
				styles[variant],
				styles[color],
				styles[size],
			]

			if (onClick)
				return (
					<button
						className={classNames(styles["chip"], additionalClasses, mods)}
						onClick={handleClick}
						onKeyDown={handleKeyDown}
						tabIndex={disabled ? -1 : tabIndex}
						disabled={disabled}
						ref={ref as React.RefObject<HTMLButtonElement>}
						type="button"
						{...buttonProps}
						{...otherProps}
					>
						<Content {...props} />
						<RippleWrapper ref={rippleWrapperRef} />
					</button>
				)
			if (href)
				return (
					<a
						className={classNames(styles["chip"], additionalClasses, mods)}
						onClick={handleClick}
						onKeyDown={handleKeyDown}
						tabIndex={tabIndex}
						href={href}
						aria-disabled={disabled ? "true" : undefined}
						ref={ref as React.RefObject<HTMLAnchorElement>}
						{...linkProps}
						{...otherProps}
					>
						<Content {...props} />
					</a>
				)
			if (to)
				return (
					<Link
						className={classNames(styles["chip"], additionalClasses, mods)}
						onClick={handleClick}
						onKeyDown={handleKeyDown}
						tabIndex={tabIndex}
						to={to}
						aria-disabled={disabled ? "true" : undefined}
						ref={ref as React.RefObject<HTMLAnchorElement>}
						{...linkProps}
						{...otherProps}
					>
						<Content {...props} />
						<RippleWrapper ref={rippleWrapperRef} />
					</Link>
				)
			return (
				<div
					className={classNames(styles["chip"], additionalClasses, mods)}
					tabIndex={tabIndex}
					ref={ref as React.RefObject<HTMLDivElement>}
					{...otherProps}
				>
					<Content {...props} />
				</div>
			)
		}
	)
)

const Content = memo(
	({ avatar, icon, label, disabled, onClose }: Partial<ChipProps>) => {
		const handleClose = (event: React.MouseEvent) => {
			event.stopPropagation()
			onClose?.(event)
		}

		return (
			<>
				{avatar &&
					cloneElement(avatar, {
						defaultBgColor: false,
						className: styles["avatar"],
					})}
				{icon && <span className={styles["icon"]}>{icon}</span>}
				<Typography
					className={styles["label"]}
					size="helper"
					color="inherit"
					noWrap
				>
					{label}
				</Typography>
				{onClose && (
					<button
						className={styles["close-button"]}
						onClick={handleClose}
						onMouseDown={(event) => event.preventDefault()}
						disabled={disabled}
						tabIndex={-1}
						type="button"
					>
						<XMark />
					</button>
				)}
			</>
		)
	}
)
