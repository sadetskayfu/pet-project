import { cloneElement, ReactElement, useCallback } from 'react'
import { usePopoverContext } from '../model/usePopoverContext'

interface PopoverCloseProps {
	children: ReactElement
}

export const PopoverClose = (props: PopoverCloseProps) => {
	const { children } = props

	const { setOpen } = usePopoverContext()

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
