import { classNames } from '@/shared/helpers/classNames'
import { AnchorHTMLAttributes, forwardRef, memo, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Indicator, IndicatorPosition } from '@/shared/ui/Indicator'
import styles from './style.module.scss'

type HTMLLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

interface NavigateLinkProps extends HTMLLinkProps {
	children: ReactNode
	to: string
	indicatorPosition?: IndicatorPosition
	fullHeight?: boolean
}

export const NavigateLink = memo(
	forwardRef(
		(props: NavigateLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
			const { className, children, to, indicatorPosition = 'bottom', fullHeight, ...otherProps } = props

			const location = useLocation()
			const isActive = location.pathname === to

			const mods: Record<string, boolean | undefined> = {
				[styles['active']]: isActive,
				[styles['full-height']]: fullHeight
			}

			return (
				<Link
					ref={ref}
					className={classNames(styles['link'], [className], mods)}
					to={to}
					{...otherProps}
				>
					{children}
					<Indicator active={isActive} position={indicatorPosition}/>
				</Link>
			)
		}
	)
)
