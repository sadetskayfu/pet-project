import { AnchorHTMLAttributes, forwardRef, memo, useRef } from 'react'
import { RippleWrapper } from '@/shared/ui/RippleWrapper'
import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
import { handleRipple, handleRippleCursorPosition } from '@/shared/lib/ripple'
import { Link, useLocation } from 'react-router-dom'
import { Indicator } from '@/shared/ui/Indicator'
import styles from './style.module.scss'

type ListItemIndicatorPosition = 'left' | 'right'

type HTMLLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

interface ListItemLinkProps extends HTMLLinkProps {
	to?: string
	indicatorPosition?: ListItemIndicatorPosition
}

export const ListItemLink = memo(
	forwardRef(
		(props: ListItemLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
			const {
				className,
				children,
				to,
				href,
				indicatorPosition = 'left',
				role = 'listitem',
				onClick,
				...otherProps
			} = props

			const location = useLocation()
			const isActive = to === location.pathname

			const rippleWrapperRef = useRef<HTMLSpanElement | null>(null)

			const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
				onClick?.(event)

				if (event.clientX) {
					handleRippleCursorPosition(rippleWrapperRef, event)
				} else {
					handleRipple(rippleWrapperRef)
				}
			}

			const mods: Mods = {
				[styles['active']]: isActive,
			}

			const additionalClasses: AdditionalClasses = [
				className,
				styles[indicatorPosition],
			]

			if (href) {
				return (
					<li className={styles['list-item']} role={role}>
						<a
							className={classNames(styles['link'], additionalClasses, mods)}
							href={to}
							onClick={handleClick}
							ref={ref}
							{...otherProps}
						>
							{children}
						</a>
					</li>
				)
			}

			return (
				<li className={styles['list-item']} role={role}>
					<Link
						className={classNames(styles['link'], additionalClasses, mods)}
						to={to!}
						onClick={handleClick}
						ref={ref}
						{...otherProps}
					>
						{children}
						<Indicator active={isActive} position={indicatorPosition} />
						<RippleWrapper ref={rippleWrapperRef} />
					</Link>
				</li>
			)
		}
	)
)
