import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import { memo, ReactNode } from 'react'
import styles from './style.module.scss'
import { TooltipArrow } from '../../TooltipArrow'

export type TooltipWithoutPortalPlacement = 'bottom' | 'top' | 'left' | 'right'
export type TooltipWithoutPortalBorderRadius = 's' | 'm'
type TooltipWithoutPortalOffset = 's' | 'm'

type AriaAttributes = {
	'aria-hidden'?: 'true' | 'false'
}

interface TooltipWithoutPortalProps extends AriaAttributes {
	className?: string
	id?: string
	children: ReactNode
	open?: boolean
	placement?: TooltipWithoutPortalPlacement
	borderRadius?: TooltipWithoutPortalBorderRadius
	style?: React.CSSProperties
	offset?: TooltipWithoutPortalOffset
}

const TooltipWithoutPortal = memo((props: TooltipWithoutPortalProps) => {
	const {
		className,
		id,
		children,
		open,
		placement = 'top',
		borderRadius = 's',
		style,
		offset,
		...otherProps
	} = props

	const additionalClasses: AdditionalClasses = [
		className,
		styles[placement],
		styles[borderRadius],
		styles[`offset-${offset}`]
	]

	const mods: Mods = {
		[styles['open']]: open,
	}

	return (
		<div
			className={classNames(styles['tooltip'], additionalClasses, mods)}
			role="tooltip"
			id={id}
			style={style}
			{...otherProps}
		>
			<div className={styles['body']}>
				{children}
				<TooltipArrow side={placement} />
			</div>
		</div>
	)
})

export default TooltipWithoutPortal
