import { classNames } from "@/shared/helpers/classNames/classNames"
import { IconProps } from "../types/IconProps"
import { memo } from "react"
import styles from "../styles/style.module.scss"

export const Upload = memo((props: IconProps) => {
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
			<path fill="currentColor" d="M11 15h2V9h3l-4-5l-4 5h3z" />
			<path
				fill="currentColor"
				d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2z"
			/>
		</svg>
	)
})

