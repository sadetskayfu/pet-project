import { AdditionalClasses, classNames } from '@/shared/helpers/classNames'
import { memo, ReactElement } from 'react'
import { Typography } from '@/shared/ui/Typography'
import styles from './style.module.scss'

export type SoloBadgeColor = 'grey' | 'green-light' | 'green'

type AriaAttributes = {
    'aria-label': string
}

interface SoloBadgeProps extends AriaAttributes {
	className?: string
	color?: SoloBadgeColor
	children: string | number
    endIcon?: ReactElement
}

export const SoloBadge = memo((props: SoloBadgeProps) => {
	const { children, className, color = 'grey', endIcon, ...otherProps } = props

	const additionalClasses: AdditionalClasses = [className, styles[color]]

	return (
		<span
			className={classNames(styles['solo-badge'], additionalClasses)}
            {...otherProps}
		>
			<Typography color="inherit" size="helper" component="span" aria-hidden="true">
				{children}
			</Typography>
			{endIcon && endIcon}
		</span>
	)
})
