import {
    useFloating,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
} from '@floating-ui/react'
import { useMemo, useState } from 'react'

type AsideMenuPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface UseAsideMenuProps {
    labelId?: string
    initialOpen?: boolean
    initialFocus?: number | React.RefObject<HTMLElement | null>
    returnFocus?: boolean | React.RefObject<HTMLElement | null>
    placement?: AsideMenuPlacement
    open?: boolean
    setOpen?: (isOpen: boolean) => void
}

export const useAsideMenu = (props: UseAsideMenuProps) => {
    const {
        labelId: externalLabelId,
        initialOpen = false,
        initialFocus,
        returnFocus = true,
        placement = 'left',
        open: controlledOpen,
        setOpen: setControlledOpen,
    } = props

    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(initialOpen)
    const [labelId, setLabelId] = useState<string | undefined>(externalLabelId)
    const [descriptionId, setDescriptionId] = useState<string | undefined>()

    const open = controlledOpen ?? uncontrolledOpen
    const setOpen = setControlledOpen ?? setUncontrolledOpen

    const data = useFloating({
        open,
        onOpenChange: setOpen,
    })

    const context = data.context

    const click = useClick(context, {
        enabled: controlledOpen == null,
    })
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: 'dialog' })

    const interactions = useInteractions([click, dismiss, role])

    return useMemo(
        () => ({
            open,
            setOpen,
            ...interactions,
            ...data,
            initialFocus,
            returnFocus,
            placement,
            labelId,
            descriptionId,
            setLabelId,
            setDescriptionId,
        }),
        [
            open,
            setOpen,
            interactions,
            data,
            initialFocus,
            returnFocus,
            placement,
            labelId,
            descriptionId,
        ]
    )
}
