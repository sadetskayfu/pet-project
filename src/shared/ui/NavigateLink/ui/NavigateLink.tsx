import { classNames } from '@/shared/helpers/classNames'
import { AnchorHTMLAttributes, forwardRef, memo, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './style.module.scss'

type HTMLLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

interface NavigateLinkProps extends HTMLLinkProps {
	children: ReactNode
	to: string
	activeWhileStartWithTo?: boolean
}

export const NavigateLink = memo(
	forwardRef(
		(props: NavigateLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
			const { className, children, to, activeWhileStartWithTo, ...otherProps } = props

			const location = useLocation()
			const isActive = location.pathname === to || (activeWhileStartWithTo && location.pathname.startsWith(to))

			const mods: Record<string, boolean | undefined> = {
				[styles['active']]: isActive,
			}

			return (
				<Link
					ref={ref}
					className={classNames(styles['link'], [className], mods)}
					to={to}
					{...otherProps}
				>
					{children}
				</Link>
			)
		}
	)
)
