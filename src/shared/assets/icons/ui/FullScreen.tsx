import { classNames } from "@/shared/helpers/classNames/classNames"
import { IconProps } from "../types/IconProps"
import { memo } from "react"
import styles from "../styles/style.module.scss"

type FullScreenVariant = "enter" | "exit"

interface FullScreenProps extends IconProps {
	variant?: FullScreenVariant
}

export const FullScreen = memo((props: FullScreenProps) => {
	const {
		className,
		color = "inherit",
		size = "inherit",
		variant = "enter",
	} = props

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[color],
		styles[size],
	]

	return (
		<svg
			className={classNames(styles["icon"], additionalClasses)}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{variant === "enter" && (
				<path fill="CurrentColor" d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z" />
			)}
			{variant === "exit" && (
				<path fill="CurrentColor" d="M10 4H8v4H4v2h6zM8 20h2v-6H4v2h4zm12-6h-6v6h2v-4h4zm0-6h-4V4h-2v6h6z" />
			)}
		</svg>
	)
})
