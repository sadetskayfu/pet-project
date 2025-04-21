import { forwardRef, ReactNode } from 'react'

export interface TabPanelProps {
    className?: string
    children: ReactNode
    id: string
    labelId: string
    isActive?: boolean
}

export const TabPanel = forwardRef((props: TabPanelProps, ref: React.ForwardedRef<HTMLDivElement>) => {

    const {className, children, id, labelId, isActive} = props

    return (
        <div ref={ref} className={className} role="tabpanel" id={id} aria-labelledby={labelId} hidden={!isActive}>
            {isActive && children}
        </div>
    )
})