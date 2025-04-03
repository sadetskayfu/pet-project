import { forwardRef, HTMLAttributes, memo } from 'react'
import { classNames } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export const ListItem = memo(
	forwardRef((props: HTMLAttributes<HTMLElement>, ref: React.ForwardedRef<HTMLLIElement>) => {
		const {
			className,
			children,
			role = 'listitem',
			...otherProps
		} = props

		return (
			<li
				className={classNames(styles['item'], [className])}
				role={role}
				ref={ref}
				{...otherProps}
			>
				{children}
			</li>
		)
	})
)
