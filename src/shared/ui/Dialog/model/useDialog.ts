import {
	useFloating,
	useClick,
	useDismiss,
	useRole,
	useInteractions,
} from '@floating-ui/react'
import { useMemo, useState } from 'react'

export interface UseDialogProps {
	initialOpen?: boolean
	initialFocus?: number | React.RefObject<HTMLElement | null>
	returnFocus?: boolean | React.RefObject<HTMLElement | null>
	open?: boolean
	setOpen?: (isOpen: boolean) => void
}

export const useDialog = (props: UseDialogProps) => {
	const {
		initialOpen = false,
		initialFocus,
		returnFocus = true,
		open: controlledOpen,
		setOpen: setControlledOpen,
	} = props

	const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(initialOpen)
	const [labelId, setLabelId] = useState<string | undefined>()
	const [descriptionId, setDescriptionId] = useState<string | undefined>()

	const open = controlledOpen ?? uncontrolledOpen
	const setOpen = setControlledOpen ?? setUncontrolledOpen

	const data = useFloating({
		open,
		onOpenChange: setOpen,
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
			initialFocus,
			returnFocus,
			labelId,
			descriptionId,
			setLabelId,
			setDescriptionId,
		}),
		[
			open,
			setOpen,
			interactions,
			data,
			initialFocus,
			returnFocus,
			labelId,
			descriptionId,
		]
	)
}
