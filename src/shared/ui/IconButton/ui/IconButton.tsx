import {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	forwardRef,
	HTMLAttributes,
	memo,
	ReactNode,
	useCallback,
	useRef,
} from 'react'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import { handleRipple, handleRippleCursorPosition } from '@/shared/lib/ripple'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

type IconButtonOffset = 'left' | 'right' | 'bottom' | 'top'
type IconButtonVariant = 'filled' | 'outlined' | 'clear'
type IconButtonSize = 'xxs' | 'xs' | 's' | 'm' | 'custom'
export type IconButtonColor =
	| 'primary'
	| 'secondary'
	| 'green'
	| 'orange'
	| 'red'
	| 'light'
	| 'inherit'
export type IconButtonBorderPlacement =
	| 'left'
	| 'top'
	| 'right'
	| 'bottom'
	| 'all'
export type IconButtonBorderRadius = 's' | 'm' | 'full' | 'none'

type HTMLProps = HTMLAttributes<HTMLElement>
type HTMLButtonProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	keyof HTMLProps | 'disabled' | 'type'
>
type HTMLLinkProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof HTMLProps | 'href'
>

interface IconButtonProps extends HTMLProps {
	className?: string
	variant?: IconButtonVariant
	color?: IconButtonColor
	size?: IconButtonSize
	offset?: IconButtonOffset
	borderRadius?: IconButtonBorderRadius
	borderPlacement?: IconButtonBorderPlacement
	stopPropagation?: boolean
	stopFocus?: boolean
	disabled?: boolean
	to?: string
	href?: string
	children: ReactNode
	type?: 'submit' | 'reset' | 'button'
	buttonProps?: HTMLButtonProps
	linkProps?: HTMLLinkProps
}

const IconButton = memo(
	forwardRef(
		(
			props: IconButtonProps,
			ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
		) => {
			const {
				children,
				className,
				disabled,
				stopPropagation,
				stopFocus,
				to,
				href,
				variant = 'filled',
				size = 'xxs',
				offset,
				color = 'secondary',
				borderRadius = 'full',
				borderPlacement = 'all',
				type = 'button',
				tabIndex: externalTabIndex,
				onClick,
				onMouseDown,
				linkProps,
				buttonProps,
				...otherProps
			} = props

			const rippleWrapperRef = useRef<HTMLSpanElement>(null)

			const handleClick = useCallback(
				(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
					if (stopPropagation) {
						event.stopPropagation()
						event.preventDefault()
					}

					onClick?.(event)

					if (event.clientX) {
						handleRippleCursorPosition(rippleWrapperRef, event)
					} else {
						handleRipple(rippleWrapperRef)
					}
				},
				[onClick, stopPropagation]
			)

			const handleMouseDown = useCallback(
				(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
					if (stopFocus) {
						event.preventDefault()
					}
					onMouseDown?.(event)
				},
				[onMouseDown, stopFocus]
			)

			const additionalClasses: Array<string | undefined> = [
				className,
				styles[variant],
				styles[color],
				styles[size],
				offset && styles[`offset-${offset}`],
				styles[`border-radius-${borderRadius}`],
				styles[borderPlacement],
			]

			const mods: Mods = {
				[styles['disabled']]: disabled,
			}

			const tabIndex = disabled ? -1 : externalTabIndex

			if (to) {
				return (
					<Link
						className={classNames(styles['button'], additionalClasses, mods)}
						to={to}
						tabIndex={tabIndex}
						onClick={handleClick}
						onMouseDown={handleMouseDown}
						ref={ref as React.ForwardedRef<HTMLAnchorElement>}
						aria-disabled={disabled ? 'true' : undefined}
						{...linkProps}
						{...otherProps}
					>
						{children}
						<RippleWrapper ref={rippleWrapperRef} />
					</Link>
				)
			}

			if (href) {
				return (
					<a
						className={classNames(styles['button'], additionalClasses, mods)}
						href={href}
						tabIndex={tabIndex}
						onClick={handleClick}
						onMouseDown={handleMouseDown}
						ref={ref as React.ForwardedRef<HTMLAnchorElement>}
						aria-disabled={disabled ? 'true' : undefined}
						{...linkProps}
						{...otherProps}
					>
						{children}
					</a>
				)
			}

			return (
				<button
					className={classNames(styles['button'], additionalClasses, mods)}
					type={type}
					onClick={handleClick}
					onMouseDown={handleMouseDown}
					tabIndex={tabIndex}
					disabled={disabled}
					ref={ref as React.ForwardedRef<HTMLButtonElement>}
					{...buttonProps}
					{...otherProps}
				>
					{children}
					<RippleWrapper ref={rippleWrapperRef} />
				</button>
			)
		}
	)
)

export default IconButton
