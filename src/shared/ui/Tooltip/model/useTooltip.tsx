import { useLongTouch, useTouchDevice } from '@/shared/hooks'
import {
	offset,
	Placement,
	useFloating,
	shift,
	flip,
	arrow,
	autoUpdate,
	useHover,
	useFocus,
	useClick,
	useInteractions,
	useClientPoint,
	useDismiss,
	safePolygon,
	useDelayGroup,
} from '@floating-ui/react'
import { useId, useMemo, useRef, useState } from 'react'

type TooltipBorderRadius = 's' | 'm'

export interface UseTooltipProps {
	id?: string
	borderRadius?: TooltipBorderRadius
	describeChild?: boolean
	interactive?: boolean
	placement?: Placement
	delay?: number | Partial<{ open: number; close: number }>
	offset?: number
	arrowPadding?: number
	flipPadding?: number
	disabledHover?: boolean
	disabledFocus?: boolean
	disabledTouch?: boolean
	disabledClick?: boolean
	followCursor?: boolean
	portalTarget?: React.RefObject<HTMLElement | null>
	open?: boolean
	setOpen?: (isOpen: boolean) => void
}

export const useTooltip = (props: UseTooltipProps) => {
	const {
		id,
		borderRadius = 's',
		describeChild,
		interactive = false,
		placement = 'top',
		delay,
		offset: offsetValue = 12,
		flipPadding = 5,
		arrowPadding = 10,
		disabledHover = false,
		disabledFocus = false,
		disabledClick = true,
		disabledTouch = false,
		followCursor = false,
		portalTarget,
		open: controlledOpen,
		setOpen: setControlledOpen,
	} = props

	const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(false)
	const localTooltipId = useId()

	const tooltipId = id ?? localTooltipId
	const open = controlledOpen ?? uncontrolledOpen
	const setOpen = setControlledOpen ?? setUncontrolledOpen
	const isUncontrolled = controlledOpen == null

	const arrowRef = useRef<HTMLSpanElement>(null)

	const { isTouchDevice } = useTouchDevice()

	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(offsetValue),
			flip({
				crossAxis: placement.includes('-'),
				fallbackAxisSideDirection: 'start',
				padding: flipPadding,
			}),
			shift({ padding: flipPadding }),
			arrow({
				element: arrowRef,
				padding: arrowPadding,
			}),
		],
	})

	const context = data.context

	const { delay: groupDelay } = useDelayGroup(context)

	const clientPoint = useClientPoint(context, {
		enabled: !isTouchDevice && followCursor && isUncontrolled,
	})
	const hover = useHover(context, {
		delay: groupDelay === 0 ? delay : groupDelay,
		enabled: !disabledHover && !isTouchDevice && isUncontrolled,
		move: followCursor,
		handleClose: interactive
			? safePolygon()
			: undefined,
	})
	const focus = useFocus(context, {
		enabled: !disabledFocus && !isTouchDevice && isUncontrolled,
	})
	const click = useClick(context, {
		enabled: !disabledClick && isUncontrolled,
	})
	const dismiss = useDismiss(context)

	const { handleTouchStart, handleTouchEnd } = useLongTouch({
		onTouchStart: () => setOpen(true),
		onTouchEnd: () => setOpen(false),
		enabled: isTouchDevice && !disabledTouch && disabledClick && isUncontrolled,
	})

	const interactions = useInteractions([
		hover,
		focus,
		click,
		dismiss,
		clientPoint,
	])

	return useMemo(
		() => ({
			open,
			setOpen,
			handleTouchStart,
			handleTouchEnd,
			arrowRef,
			tooltipId,
			describeChild,
			borderRadius,
			interactive,
			portalTarget,
			...data,
			...interactions,
		}),
		[
			open,
			setOpen,
			handleTouchStart,
			handleTouchEnd,
			tooltipId,
			describeChild,
			borderRadius,
			interactive,
			portalTarget,
			data,
			interactions,
		]
	)
}
