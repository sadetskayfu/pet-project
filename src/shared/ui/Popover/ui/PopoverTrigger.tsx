import { cloneElement, ReactElement } from 'react'
import { usePopoverContext } from '../model/usePopoverContext'
import { useMergeRefs } from '@floating-ui/react'

interface PopoverTriggerProps {
	children: ReactElement
}

export const PopoverTrigger = (props: PopoverTriggerProps) => {
	const { children } = props

	const { getReferenceProps, refs, open } = usePopoverContext()

	const childrenRef = (children as any).ref
	const ref = useMergeRefs([refs.setReference, childrenRef])

	return cloneElement(
		children,
		getReferenceProps({
			ref,
			...children.props,
			'data-open': open ? '' : undefined,
		})
	)
}
