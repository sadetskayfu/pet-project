import { classNames } from "@/shared/helpers/classNames/classNames"
import { IconProps } from "../types/IconProps"
import { memo } from "react"
import styles from "../styles/style.module.scss"

export const Picture = memo((props: IconProps) => {
	const { className, color = "inherit", size = "inherit" } = props

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[color],
		styles[size],
	]

	return (
		<svg
			className={classNames(styles["icon"], additionalClasses)}
			viewBox="0 0 36 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="currentColor"
				d="M32 4H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M4 30V6h28v24Z"
			/>
			<path
				fill="currentColor"
				d="M8.92 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3m0-4.6A1.6 1.6 0 1 1 7.33 11a1.6 1.6 0 0 1 1.59-1.59Z"
			/>
			<path
				fill="currentColor"
				d="m22.78 15.37l-5.4 5.4l-4-4a1 1 0 0 0-1.41 0L5.92 22.9v2.83l6.79-6.79L16 22.18l-3.75 3.75H15l8.45-8.45L30 24v-2.82l-5.81-5.81a1 1 0 0 0-1.41 0"
			/>
			<path fill="none" d="M0 0h36v36H0z" />
		</svg>
	)
})
