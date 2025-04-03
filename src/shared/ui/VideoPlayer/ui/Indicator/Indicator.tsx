import { Play, Restart, Rewind } from "@/shared/assets/icons"
import { Pause } from "@/shared/assets/icons/ui/Pause"
import { memo } from "react"
import { AdditionalClasses, classNames, Mods } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

export type IndicatorVariant = "play" | "pause" | "rewind" | "fast-forward" | 'restart'

interface IndicatorProps {
	variant: IndicatorVariant
	label?: string
	visible?: boolean
}

const getIcon = (variant: IndicatorVariant) => {
	switch (variant) {
		case "play":
			return <Play />
		case "pause":
			return <Pause />
		case "fast-forward":
			return <Rewind direction="right" />
		case "rewind":
			return <Rewind direction="left" />
        case "restart":
            return <Restart />
		default:
			return null
	}
}

export const Indicator = memo((props: IndicatorProps) => {
	const { variant, label, visible } = props

    const additionalClasses: AdditionalClasses = [
        styles[variant]
    ]

	const mods: Mods = {
		[styles['visible']]: visible
	}

	return (
		<span aria-hidden='true' className={classNames(styles["indicator"], additionalClasses, mods)}>
			{getIcon(variant)}
			{label && <span className={styles['label']}>{label}</span>}
		</span>
	)
})
