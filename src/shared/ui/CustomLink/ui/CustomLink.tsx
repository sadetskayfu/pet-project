import { classNames } from '@/shared/helpers/classNames'
import { AnchorHTMLAttributes, forwardRef, memo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

type CustomLinkUnderline = 'none' | 'hover' | 'always'
type CustomLinkColor = 'primary' | 'soft' | 'inherit'

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode
	to?: string
	underline?: CustomLinkUnderline
	color?: CustomLinkColor
}

export const CustomLink = memo(forwardRef((props: CustomLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
	const { children, className, to, href, underline = 'hover', color = 'primary', ...otherProps } = props

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[underline],
		styles[color]
	]

	if (to) {
		return (
				<Link
					to={to}
					className={classNames(styles['link'], additionalClasses)}
					ref={ref}
					{...otherProps}
				>
					{children}
				</Link>
		)
	}

	return (
		<a
			href={href}
			className={classNames(styles['link'], additionalClasses)}
			ref={ref}
			{...otherProps}
		>
			{children}
		</a>
	)
}))
