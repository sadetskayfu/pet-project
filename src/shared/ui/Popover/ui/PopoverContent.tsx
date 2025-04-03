import {
	FloatingFocusManager,
	FloatingPortal,
	useTransitionStatus,
} from '@floating-ui/react'
import { usePopoverContext } from '../model/usePopoverContext'
import { ReactNode, useEffect, useRef } from 'react'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { TooltipArrow, TooltipArrowSide } from '@/shared/ui/TooltipArrow'
import styles from './style.module.scss'

interface PopoverContentProps {
	className?: string
	children: ReactNode
	style?: React.CSSProperties
	zIndex?: number
	id?: string
}

export const PopoverContent = (props: PopoverContentProps) => {
	const { className, children, style, id, zIndex = 1500 } = props

	const {
		context,
		refs,
		modal,
		labelId,
		descriptionId,
		floatingStyles,
		initialFocus,
		returnFocus,
		portalTarget,
		referenceRef,
		arrowRef,
		showArrow,
		getFloatingProps,
	} = usePopoverContext()

	const popoverRef = useRef<HTMLDivElement>(null)

	const initialFocusValue = initialFocus != null ? initialFocus : popoverRef

	const { isMounted, status } = useTransitionStatus(context, {
		duration: 200,
	})

	const arrowX = context.middlewareData.arrow?.x
	const arrowY = context.middlewareData.arrow?.y
	const side = context.placement.split('-')[0]

	if(referenceRef) {
		refs.setReference(referenceRef.current)
	}

	useEffect(() => {
		if(status === 'close') {
			if(typeof returnFocus === 'boolean') {
				if(returnFocus) {
					const referenceEl = refs.reference.current as HTMLElement | null
					referenceEl?.focus()
				}
			} else {
				returnFocus.current?.focus()
			}
		}
	}, [status, returnFocus, refs.reference])

	const mods: Mods = {
		[styles['open']]: status === 'open',
		[styles['close']]: status === 'close',
	}

	if (!isMounted) return null

	return (
		<FloatingPortal root={portalTarget}>
			<FloatingFocusManager
				initialFocus={initialFocusValue}
				returnFocus={false}
				context={context}
				modal={modal}
			>
				<div ref={refs.setFloating} style={{...floatingStyles, zIndex}} role="presentation">
					<div
						className={classNames(styles['popover'], [className], mods)}
						style={style}
						ref={popoverRef}
						aria-labelledby={labelId}
						aria-describedby={descriptionId}
						{...getFloatingProps()}
						{...(id != null ? { id } : {})}
					>
						{children}
						{showArrow && (
							<TooltipArrow
								ref={arrowRef}
								side={side as TooltipArrowSide}
								style={{
									left: arrowX != null ? `${arrowX}px` : '',
									top: arrowY != null ? `${arrowY}px` : '',
								}}
							/>
						)}
					</div>
				</div>
			</FloatingFocusManager>
		</FloatingPortal>
	)
}
