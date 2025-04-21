import { AdditionalClasses, classNames } from '@/shared/helpers/classNames'
import { memo, ReactElement } from 'react'
import styles from './style.module.scss'

export type SoloBadgeColor = 'grey' | 'green-light' | 'green'
type SoloBadgeSize = 's' | 'm'

type AriaAttributes = {
    'aria-label'?: string
}

interface SoloBadgeProps extends AriaAttributes {
	className?: string
	color?: SoloBadgeColor
	size?: SoloBadgeSize
	children: string | number
    endIcon?: ReactElement
}

export const SoloBadge = memo((props: SoloBadgeProps) => {
	const { children, className, color = 'grey', size = 's', endIcon, ...otherProps } = props

	const additionalClasses: AdditionalClasses = [className, styles[color], styles[size]]

	return (
		<span
			className={classNames(styles['solo-badge'], additionalClasses)}
            {...otherProps}
		>
			<span>
				{children}
			</span>
			{endIcon && endIcon}
		</span>
	)
})
