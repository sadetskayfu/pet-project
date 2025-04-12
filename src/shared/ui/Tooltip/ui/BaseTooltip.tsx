import { ReactElement } from "react"
import { Tooltip } from "./Tooltip"
import { TooltipTrigger } from "./TooltipTrigger"
import { TooltipContent } from "./TooltipContent"
import { Typography } from "@/shared/ui/Typography"
import { UseTooltipProps } from "../model/useTooltip"

interface BaseTooltipProps extends UseTooltipProps {
	children: ReactElement
	maxWidth?: number
	label: string | number
	contentClassName?: string
}

export const BaseTooltip = (props: BaseTooltipProps) => {
	const { children, contentClassName, label, maxWidth, ...otherProps } = props

	return (
		<Tooltip {...otherProps}>
			<TooltipTrigger>{children}</TooltipTrigger>
			<TooltipContent className={contentClassName} maxWidth={maxWidth}>
				<Typography color="hard" size="helper">
					{label}
				</Typography>
			</TooltipContent>
		</Tooltip>
	)
}
