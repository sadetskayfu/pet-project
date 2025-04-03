import { cloneElement, ReactElement, useId, useLayoutEffect } from 'react'
import { useDialogContext } from '../model/useDialogContext'

interface DialogHeadingProps {
	children: ReactElement
}

export const DialogHeading = (props: DialogHeadingProps) => {
	const { children } = props

	const { setLabelId } = useDialogContext()
	const id = useId()

	useLayoutEffect(() => {
		setLabelId(id)

		return () => {
			setLabelId(undefined)
		}
	}, [id, setLabelId])

	return cloneElement(children, { id })
}
