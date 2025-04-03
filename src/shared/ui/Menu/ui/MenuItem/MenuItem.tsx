import {
	ReactNode,
	ButtonHTMLAttributes,
	forwardRef,
	memo,
	useRef,
	useCallback,
	HTMLAttributes,
	AnchorHTMLAttributes,
} from 'react'
import { useMenuContext } from '../../model/useMenuContext'
import { useFloatingTree, useListItem, useMergeRefs } from '@floating-ui/react'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import { handleRipple, handleRippleCursorPosition } from '@/shared/lib/ripple'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

type HTMLProps = HTMLAttributes<HTMLElement>
type HTMLButtonProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	keyof HTMLProps | 'disabled'
>
type HTMLLinkProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof HTMLProps | 'href'
>

interface MenuItemProps extends HTMLProps {
	className?: string
	children: ReactNode
	label: string
	to?: string
	href?: string
	disabled?: boolean
	stopClose?: boolean
	buttonProps?: HTMLButtonProps
	linkProps?: HTMLLinkProps
}

export const MenuItem = memo(
	forwardRef((props: MenuItemProps, ref) => {
		const {
			className,
			children,
			label,
			to,
			href,
			disabled,
			stopClose,
			buttonProps,
			linkProps,
			onClick,
			onFocus,
			...otherProps
		} = props

		const { getItemProps, activeIndex } = useMenuContext()
		const item = useListItem({ label: disabled ? null : label })
		const tree = useFloatingTree()
		const mergeRef = useMergeRefs([item.ref, ref])

		const isActive = item.index === activeIndex

		const rippleWrapperRef = useRef<HTMLSpanElement>(null)

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
				onClick?.(event)

				if (event.clientX) {
					handleRippleCursorPosition(rippleWrapperRef, event)
				} else {
					handleRipple(rippleWrapperRef)
				}
			},
			[onClick]
		)

		const mods: Mods = {
			[styles['disabled']]: disabled,
		}

		const sharedProps = {
			role: 'menuitem',
			ref: mergeRef,
			tabIndex: isActive ? 0 : -1,
			...getItemProps({
				onClick(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
					handleClick(event)

					if (!stopClose) {
						tree?.events.emit('click')
					}
				},
				onFocus,
			}),
		}

		if (to)
			return (
				<li className={classNames(styles['item'], [className], mods)} role="none">
					<Link
						className={styles['link']}
						to={to}
						aria-disabled={disabled ? 'true' : undefined}
						{...otherProps}
						{...linkProps}
						{...sharedProps}
					>
						{children}
						<RippleWrapper ref={rippleWrapperRef} />
					</Link>
				</li>
			)
		if (href)
			return (
				<li className={classNames(styles['item'], [className], mods)} role="none">
					<a
						className={styles['link']}
						href={href}
						aria-disabled={disabled ? 'true' : undefined}
						{...otherProps}
						{...linkProps}
						{...sharedProps}
					>
						{children}
					</a>
				</li>
			)
		return (
			<li className={classNames(styles['item'], [className], mods)} role="none">
				<button
					className={styles['button']}
					disabled={disabled}
					type="button"
					{...otherProps}
					{...buttonProps}
					{...sharedProps}
				>
					{children}
					<RippleWrapper ref={rippleWrapperRef} />
				</button>
			</li>
		)
	})
)
