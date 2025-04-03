import {
	TooltipWithoutPortal,
	TooltipWithoutPortalPlacement,
} from "@/shared/ui/TooltipWithoutPortal"
import { calculateTranslateThumb } from "../../helpers"
import { SliderOrientation } from "../Slider/Slider"
import { Typography } from "@/shared/ui/Typography"
import { AdditionalClasses, classNames } from "@/shared/helpers/classNames"
import { memo } from "react"
import styles from "./style.module.scss"

interface HoverTooltipProps {
	className?: string
	value: number
	min: number
	max: number
	orientation: SliderOrientation
	placement?: TooltipWithoutPortalPlacement
	getTooltipLabel?: (value: number) => string | number
}

const HoverTooltip = memo((props: HoverTooltipProps) => {
	const { className, value, max, min, orientation, placement, getTooltipLabel } =
		props

	const translate = `${calculateTranslateThumb(value, min, max)}%`
	const isHorizontal = orientation === "horizontal"

	const additionalClasses: AdditionalClasses = [className, styles[orientation]]

	return (
		<TooltipWithoutPortal
			className={classNames(styles["tooltip"], additionalClasses)}
			placement={placement}
			offset="m"
			style={{
				left: isHorizontal ? translate : "",
				bottom: !isHorizontal ? translate : "",
			}}
            aria-hidden="true"
		>
			<Typography noWrap color="hard" size="helper">
				{getTooltipLabel ? getTooltipLabel(value) : value}
			</Typography>
		</TooltipWithoutPortal>
	)
})

export default HoverTooltip
