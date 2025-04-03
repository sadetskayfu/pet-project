import { cloneElement, ReactElement, useCallback } from 'react'
import { useDialogContext } from '../model/useDialogContext'

interface DialogCloseProps {
	children: ReactElement
}

export const DialogClose = (props: DialogCloseProps) => {
	const { children } = props

	const { setOpen } = useDialogContext()

	const handleClick = useCallback(
		(event: React.MouseEvent) => {
			const originalOnClick = children.props.onClick

			originalOnClick?.(event)
			setOpen(false)
		},
		[setOpen, children.props.onClick]
	)

	return cloneElement(children, { onClick: handleClick })
}
