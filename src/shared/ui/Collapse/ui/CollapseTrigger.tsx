import { cloneElement, ReactElement } from 'react'
import { useCollapseContent } from '../model/useCollapseContext'

interface CollapseTriggerProps {
	children: ReactElement
}

export const CollapseTrigger = (props: CollapseTriggerProps) => {
	const { children } = props

	const { open, setOpen, labelId, bodyId, lazy, unmount, disabledClick } = useCollapseContent()

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		children.props.onClick?.(event)

		if(!disabledClick) {
            setOpen((prev) => !prev)
        }
	}

    const isLazy = lazy || unmount

    const childrenProps = {
        id: labelId,
        onClick: handleClick,
        'aria-controls': isLazy ? (open ? bodyId : undefined) : bodyId,
        'aria-expanded': open ? 'true' : 'false',
        'data-open': open ? '' : undefined,
    }

	return cloneElement(children,  childrenProps)
}
