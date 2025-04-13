import { ReactElement } from "react"
import { Tooltip } from "../Tooltip"
import { TooltipTrigger } from "../TooltipTrigger"
import { TooltipContent } from "../TooltipContent"
import { Typography } from "@/shared/ui/Typography"
import { UseTooltipProps } from "../../model/useTooltip"
import { classNames, Mods } from "@/shared/helpers/classNames"
import styles from './style.module.scss'

interface BaseTooltipProps extends UseTooltipProps {
	children: ReactElement
	maxWidth?: number
	label: string | number
	contentClassName?: string
	centering?: boolean
}

export const BaseTooltip = (props: BaseTooltipProps) => {
	const { children, contentClassName, label, maxWidth, centering, ...otherProps } = props

	const mods: Mods = {
		[styles['centering']]: centering
	}

	return (
		<Tooltip {...otherProps}>
			<TooltipTrigger>{children}</TooltipTrigger>
			<TooltipContent className={classNames(styles['tooltip-content'], [contentClassName], mods)} maxWidth={maxWidth}>
				<Typography color="hard" size="helper">
					{label}
				</Typography>
			</TooltipContent>
		</Tooltip>
	)
}
