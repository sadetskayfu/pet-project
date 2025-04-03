import { memo, ReactElement } from 'react'
import { Typography } from '@/shared/ui/Typography'
import { classNames, Mods } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

interface MenuItemContentProps {
	className?: string
	title?: string
	description?: string
	startIcon?: ReactElement
	endIcon?: ReactElement
}

export const MenuItemContent = memo((props: MenuItemContentProps) => {
	const { className, title, description, startIcon, endIcon } = props

	const mods: Mods = {
		[styles['with-start-icon']]: !!startIcon,
		[styles['with-end-icon']]: !!endIcon,
	}

	return (
		<div className={classNames(styles['content'], [className], mods)}>
			<div className={styles['header']}>
				{startIcon && <span className={styles['start-icon']}>{startIcon}</span>}
				{title}
				{endIcon && <span className={styles['end-icon']}>{endIcon}</span>}
			</div>
			{description && (
				<Typography
					className={styles['description']}
					size="helper"
					color="soft"
					component="p"
				>
					{description}
				</Typography>
			)}
		</div>
	)
})
