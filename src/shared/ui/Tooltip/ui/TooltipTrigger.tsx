import { cloneElement, ReactElement } from 'react'
import { useTooltipContext } from '../model/useTooltipContext'
import { useMergeRefs } from '@floating-ui/react'

interface TooltipTriggerProps {
	children: ReactElement
}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
	const { children } = props

	const {
		getReferenceProps,
        handleTouchStart,
        handleTouchEnd,
		refs,
		open,
		tooltipId,
		describeChild,
	} = useTooltipContext()

	const childrenRef = (children as any).ref
	const ref = useMergeRefs([refs.setReference, childrenRef])

	return cloneElement(
		children,
		getReferenceProps({
			ref,
			...children.props,
            onTouchStart: handleTouchStart,
            onTouchEnd: handleTouchEnd,
			'data-open': open ? '' : undefined,
			'aria-describedby': describeChild && open ? tooltipId : undefined,
		})
	)
}
