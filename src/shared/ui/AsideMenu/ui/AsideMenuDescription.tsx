import { cloneElement, ReactElement, useId, useLayoutEffect } from 'react'
import { useAsideMenuContext } from '../model/useAsideMenuContext'

interface AsideMenuDescriptionProps {
    children: ReactElement
}

export const AsideMenuDescription = (props: AsideMenuDescriptionProps) => {
    const { children } = props

    const { setDescriptionId } = useAsideMenuContext()
    const id = useId()

    useLayoutEffect(() => {
        setDescriptionId(id)

        return () => {
            setDescriptionId(undefined)
        }
    }, [id, setDescriptionId])

    return cloneElement(children, { id })
}
