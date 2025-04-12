import { classNames } from "@/shared/helpers/classNames/classNames"
import { IconProps } from "../types/IconProps"
import { memo } from "react"
import styles from "../styles/style.module.scss"

export const Play = memo((props: IconProps) => {
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
			<path fill="CurrentColor" stroke-width="2" d="m3 22l18-10L3 2zm2-3l12.6-7L5 5zm2-3l7.2-4L7 8zm2-3l1.8-1L9 11z"/>
		</svg>
	)
})

