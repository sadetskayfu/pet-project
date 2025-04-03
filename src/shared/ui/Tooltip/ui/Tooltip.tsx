import { ReactNode } from "react"
import { useTooltip, UseTooltipProps } from "../model/useTooltip"
import { TooltipContext } from "../model/TooltipContext"

interface TooltipProps extends UseTooltipProps {
    children: ReactNode
}

export const Tooltip = (props: TooltipProps) => {
    const { children, ...useTooltipProps } = props

    const tooltip = useTooltip(useTooltipProps)

    return (
        <TooltipContext.Provider value={tooltip}>
            {children}
        </TooltipContext.Provider>
    )
}