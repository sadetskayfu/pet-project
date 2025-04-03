import { ReactNode } from 'react'
import { useTooltipContext } from '../model/useTooltipContext'
import {
	FloatingPortal,
	useDelayGroup,
	useTransitionStatus,
} from '@floating-ui/react'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { TooltipArrow, TooltipArrowSide } from '@/shared/ui/TooltipArrow'
import styles from './style.module.scss'

interface TooltipContentProps {
	className?: string
	children: ReactNode
	maxWidth?: number
	style?: React.CSSProperties
	zIndex?: number
}

export const TooltipContent = (props: TooltipContentProps) => {
	const { className, children, maxWidth, style, zIndex = 1500 } = props

	const {
		tooltipId,
		context,
		refs,
		floatingStyles,
		arrowRef,
		borderRadius,
		interactive,
		portalTarget,
		getFloatingProps,
	} = useTooltipContext()

	const { currentId, isInstantPhase } = useDelayGroup(context, {
		id: context.floatingId,
	})

	const instantDuration = 100
	const duration = 200

	const { isMounted, status } = useTransitionStatus(context, {
		duration: isInstantPhase
			? {
					open: instantDuration,
					close: currentId === context.floatingId ? duration : instantDuration,
				}
			: duration,
	})

	const arrowX = context.middlewareData.arrow?.x
	const arrowY = context.middlewareData.arrow?.y
	const side = context.placement.split('-')[0]

	const mods: Mods = {
		[styles['open']]: status === 'open',
		[styles['close']]: status === 'close',
		[styles['instant-phase']]: isInstantPhase,
	}

	if (!isMounted) return null

	return (
		<FloatingPortal root={portalTarget}>
			<div
				role="presentation"
				ref={refs.setFloating}
				style={{ ...floatingStyles, pointerEvents: interactive ? 'all' : 'none', zIndex, maxWidth }}
			>
				<div
					id={tooltipId}
					role="tooltip"
					style={style}
					className={classNames(
						styles['tooltip'],
						[className, styles[borderRadius]],
						mods
					)}
					{...getFloatingProps()}
				>
					{children}
					<TooltipArrow
						ref={arrowRef}
						side={side as TooltipArrowSide}
						style={{
							left: arrowX != null ? `${arrowX}px` : '',
							top: arrowY != null ? `${arrowY}px` : '',
						}}
					/>
				</div>
			</div>
		</FloatingPortal>
	)
}
