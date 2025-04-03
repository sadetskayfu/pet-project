import { PopoverContext } from '../model/PopoverContext'
import { UsePopoverProps, usePopover } from '../model/usePopover'
import { ReactNode } from 'react'

interface PopoverProps extends UsePopoverProps {
	children: ReactNode
}

export const Popover = (props: PopoverProps) => {
	const { children, ...usePopoverProps } = props

	const popover = usePopover(usePopoverProps)

	return (
		<PopoverContext.Provider value={popover}>
			{children}
		</PopoverContext.Provider>
	)
}
