import { cloneElement, HTMLAttributes, ReactElement } from 'react'
import { useDialogContext } from '../model/useDialogContext'
import { useMergeRefs } from '@floating-ui/react'

interface DialogTriggerProps {
	children: ReactElement<HTMLAttributes<HTMLElement>>
}

export const DialogTrigger = (props: DialogTriggerProps) => {
	const { children } = props

	const { getReferenceProps, refs, open } = useDialogContext()

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
