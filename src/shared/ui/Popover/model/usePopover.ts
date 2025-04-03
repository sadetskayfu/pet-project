import {
	Placement,
	useFloating,
	flip,
	shift,
	autoUpdate,
	useClick,
	useDismiss,
	useRole,
	useInteractions,
	arrow,
	offset,
} from '@floating-ui/react'
import { useMemo, useRef, useState } from 'react'

export interface UsePopoverProps {
	initialOpen?: boolean
	placement?: Placement
	offset?: number
	flipPadding?: number
	arrowPadding?: number
	modal?: boolean
	labelId?: string
	initialFocus?: number | React.RefObject<HTMLElement | null>
	returnFocus?: boolean | React.RefObject<HTMLElement | null>
	portalTarget?: React.RefObject<HTMLElement | null>
	referenceRef?: React.RefObject<HTMLElement | null>
	arrow?: boolean
	open?: boolean
	setOpen?: (isOpen: boolean) => void
}

export const usePopover = (props: UsePopoverProps) => {
	const {
		placement = 'bottom',
		offset: offsetValue = 5,
		flipPadding = 5,
		arrowPadding = 10,
		initialOpen = false,
		modal = false,
		labelId: externalLabelId,
		initialFocus,
		returnFocus = true,
		portalTarget,
		referenceRef,
		arrow: showArrow,
		open: controlledOpen,
		setOpen: setControlledOpen,
	} = props

	const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(initialOpen)
	const [labelId, setLabelId] = useState<string | undefined>(externalLabelId)
	const [descriptionId, setDescriptionId] = useState<string | undefined>()

	const open = controlledOpen ?? uncontrolledOpen
	const setOpen = setControlledOpen ?? setUncontrolledOpen

	const arrowRef = useRef<HTMLSpanElement>(null)

	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(offsetValue),
			flip({
				crossAxis: placement.includes('-'),
				fallbackAxisSideDirection: 'end',
				padding: flipPadding,
			}),
			shift({ padding: offsetValue }),
			showArrow
				? arrow({
						element: arrowRef,
						padding: arrowPadding,
					})
				: null,
		],
	})

	const context = data.context

	const click = useClick(context, {
		enabled: controlledOpen == null,
	})
	const dismiss = useDismiss(context)
	const role = useRole(context, { role: 'dialog' })

	const interactions = useInteractions([click, dismiss, role])

	return useMemo(
		() => ({
			open,
			setOpen,
			...interactions,
			...data,
			referenceRef,
			modal,
			showArrow,
			arrowRef,
			initialFocus,
			returnFocus,
			portalTarget,
			labelId,
			descriptionId,
			setLabelId,
			setDescriptionId,
		}),
		[
			open,
			setOpen,
			showArrow,
			arrowRef,
			interactions,
			data,
			referenceRef,
			modal,
			initialFocus,
			returnFocus,
			portalTarget,
			labelId,
			descriptionId,
		]
	)
}
