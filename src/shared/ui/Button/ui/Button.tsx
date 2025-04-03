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
import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import { handleRipple, handleRippleCursorPosition } from '@/shared/lib/ripple'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

type ButtonVariant = 'filled' | 'outlined' | 'clear'
type ButtonColor = 'primary' | 'secondary' | 'red' | 'orange' | 'green'
type ButtonSize = 'xs' | 's' | 'm' | 'l'
type ButtonBorderPlacement =
	| 'left'
	| 'top'
	| 'right'
	| 'bottom'
	| 'all'
type ButtonBorderRadius = 's' | 'm' | 'full' | 'none'

type HTMLProps = HTMLAttributes<HTMLElement>
type HTMLButtonProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	keyof HTMLProps | 'disabled' | 'type'
>
type HTMLLinkProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof HTMLProps | 'href'
>

interface ButtonProps extends HTMLProps {
	className?: string
	children: ReactNode
	variant?: ButtonVariant
	color?: ButtonColor
	size?: ButtonSize
	borderRadius?: ButtonBorderRadius
	borderPlacement?: ButtonBorderPlacement
	disabled?: boolean
	href?: string
	to?: string
	type?: 'submit' | 'reset' | 'button'
	buttonProps?: HTMLButtonProps
	linkProps?: HTMLLinkProps
}

export const Button = memo(
	forwardRef(
		(
			props: ButtonProps,
			ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
		) => {
			const {
				children,
				className,
				disabled,
				href,
				to,
				variant = 'filled',
				size = 's',
				color = 'secondary',
				type = 'button',
				borderRadius = 'm',
				borderPlacement = 'all',
				tabIndex: externalTabIndex,
				onClick,
				linkProps,
				buttonProps,
				...otherProps
			} = props

			const rippleWrapperRef = useRef<HTMLSpanElement>(null)

			const handleClick = useCallback((
				event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
			) => {
				onClick?.(event)

				if (event.clientX) {
					handleRippleCursorPosition(rippleWrapperRef, event)
				} else {
					handleRipple(rippleWrapperRef)
				}
			}, [onClick])

			const additionalClasses: AdditionalClasses = [
				className,
				styles[variant],
				styles[color],
				styles[size],
				styles[`border-radius-${borderRadius}`],
				styles[borderPlacement],
			]

			const mods: Mods = {
				[styles['disabled']]: disabled
			}

			const tabIndex = disabled ? -1 : externalTabIndex

			if (to) {
				return (
					<Link
						className={classNames(styles['button'], additionalClasses, mods)}
						onClick={handleClick}
						to={to}
						tabIndex={tabIndex}
						aria-disabled={disabled ? 'true' : undefined}
						ref={ref as React.ForwardedRef<HTMLAnchorElement>}
						{...otherProps}
						{...linkProps}
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
						onClick={handleClick}
						href={href}
						tabIndex={tabIndex}
						aria-disabled={disabled ? 'true' : undefined}
						ref={ref as React.ForwardedRef<HTMLAnchorElement>}
						{...otherProps}
						{...linkProps}
					>
						{children}
					</a>
				)
			}

			return (
				<button
					className={classNames(styles['button'], additionalClasses, mods)}
					onClick={handleClick}
					type={type}
					tabIndex={tabIndex}
					disabled={disabled}
					ref={ref as React.ForwardedRef<HTMLButtonElement>}
					{...otherProps}
					{...buttonProps}
				>
					{children}
					<RippleWrapper ref={rippleWrapperRef} />
				</button>
			)
		}
	)
)
