import { cloneElement, ReactElement, useId, useLayoutEffect } from 'react'
import { useDialogContext } from '../model/useDialogContext'

interface DialogDescriptionProps {
    children: ReactElement
}

export const DialogDescription = (props: DialogDescriptionProps) => {
    const { children } = props

    const { setDescriptionId } = useDialogContext()
    const id = useId()

    useLayoutEffect(() => {
        setDescriptionId(id)

        return () => {
            setDescriptionId(undefined)
        }
    }, [id, setDescriptionId])

    return cloneElement(children, { id })
}
