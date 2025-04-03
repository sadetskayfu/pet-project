import { cloneElement, ReactElement } from 'react'
import { useAsideMenuContext } from '../model/useAsideMenuContext'
import { useMergeRefs } from '@floating-ui/react'

interface AsideMenuTriggerProps {
    children: ReactElement
}

export const AsideMenuTrigger = (props: AsideMenuTriggerProps) => {
    const { children } = props

    const { getReferenceProps, refs, open } = useAsideMenuContext()

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
