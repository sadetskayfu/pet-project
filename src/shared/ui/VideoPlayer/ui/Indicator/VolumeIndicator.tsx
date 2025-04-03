import { Volume } from "@/shared/assets/icons"
import { memo } from "react"
import { classNames, Mods } from "@/shared/helpers/classNames"
import styles from './style.module.scss'

export type VolumeIndicatorVariant = "volume-change" | "mute" | "unmute"

interface VolumeIndicatorProps {
	value: number
	variant?: VolumeIndicatorVariant | null
	visible?: boolean
}

const getIcon = (variant: VolumeIndicatorVariant, value: number) => {
	switch (variant) {
		case "mute":
			return <Volume variant="mute" />
		case "unmute":
			return (
				<Volume variant={value >= 50 ? "full" : value === 0 ? "mute" : "low"} />
			)
		case "volume-change":
			return (
				<Volume variant={value >= 50 ? "full" : value === 0 ? "mute" : "low"} />
			)
		default:
			return null
	}
}

export const VolumeIndicator = memo((props: VolumeIndicatorProps) => {
	const { value, variant, visible } = props

	const mods: Mods = {
		[styles['visible']]: visible
	}

	return (
		<span aria-hidden='true' className={classNames(styles['indicator'], [styles['volume']], mods)}>
			{variant && getIcon(variant, value)}
			{variant === "volume-change" && <span className={styles['label']}>{value}%</span>}
		</span>
	)
})
