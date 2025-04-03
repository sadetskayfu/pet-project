import { cloneElement, ReactElement, useCallback } from 'react'
import { useAsideMenuContext } from '../model/useAsideMenuContext'

interface AsideMenuCloseProps {
	children: ReactElement
}

export const AsideMenuClose = (props: AsideMenuCloseProps) => {
	const { children } = props

	const { setOpen } = useAsideMenuContext()

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
