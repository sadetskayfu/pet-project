import { cloneElement, ReactElement, useId, useLayoutEffect } from 'react'
import { usePopoverContext } from '../model/usePopoverContext'

interface PopoverDescriptionProps {
    children: ReactElement
}

export const PopoverDescription = (props: PopoverDescriptionProps) => {
    const { children } = props

    const { setDescriptionId } = usePopoverContext()
    const id = useId()

    useLayoutEffect(() => {
        setDescriptionId(id)

        return () => {
            setDescriptionId(undefined)
        }
    }, [id, setDescriptionId])

    return cloneElement(children, { id })
}
