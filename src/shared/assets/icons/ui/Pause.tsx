import { classNames } from "@/shared/helpers/classNames/classNames"
import { IconProps } from "../types/IconProps"
import { memo } from "react"
import styles from "../styles/style.module.scss"

export const Pause = memo((props: IconProps) => {
	const { className, color = "inherit", size = "inherit" } = props

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
			<path
				stroke-width="2"
				d="M3 21h6V3H3zm1-2h4V5H4zm1-2h2V7H5zm10 4h6V3h-6zm1-2h4V5h-4zm1-2h2V7h-2z"
			/>
		</svg>
	)
})
