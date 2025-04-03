import { cloneElement, ReactElement, useId, useLayoutEffect } from 'react'
import { usePopoverContext } from '../model/usePopoverContext'

interface PopoverHeadingProps {
	children: ReactElement
}

export const PopoverHeading = (props: PopoverHeadingProps) => {
	const { children } = props

	const { setLabelId } = usePopoverContext()
	const id = useId()

	useLayoutEffect(() => {
		setLabelId(id)

		return () => {
			setLabelId(undefined)
		}
	}, [id, setLabelId])

	return cloneElement(children, { id })
}
