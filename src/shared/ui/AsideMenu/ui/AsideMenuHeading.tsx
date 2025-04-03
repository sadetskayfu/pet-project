import { cloneElement, ReactElement, useId, useLayoutEffect } from 'react'
import { useAsideMenuContext } from '../model/useAsideMenuContext'

interface AsideMenuHeadingProps {
    children: ReactElement
}

export const AsideMenuHeading = (props: AsideMenuHeadingProps) => {
    const { children } = props

    const { setLabelId } = useAsideMenuContext()
    const id = useId()

    useLayoutEffect(() => {
        setLabelId(id)

        return () => {
            setLabelId(undefined)
        }
    }, [id, setLabelId])

    return cloneElement(children, { id })
}
