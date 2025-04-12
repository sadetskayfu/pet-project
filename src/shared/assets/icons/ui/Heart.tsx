import { classNames } from "@/shared/helpers/classNames/classNames"
import { IconProps } from "../types/IconProps"
import { memo } from "react"
import styles from "../styles/style.module.scss"

interface HeartProps extends IconProps {
	variant?: "filled" | "outlined"
}

export const Heart = memo((props: HeartProps) => {
	const {
		className,
		color = "inherit",
		size = "inherit",
		variant = "filled",
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
			{variant === "filled" && (
				<path fill="currentColor" d="M7 2C3.31333 2 1 5.21475 1 8.5C1 11.8412 2.67415 14.6994 4.77151 16.9297C6.8721 19.1634 9.47698 20.8565 11.5528 21.8944C11.8343 22.0352 12.1657 22.0352 12.4472 21.8944C14.523 20.8565 17.1279 19.1634 19.2285 16.9297C21.3259 14.6994 23 11.8412 23 8.5C23 5.22013 20.7289 2 17 2C15.275 2 14.0531 2.47979 13.1186 3.20977C12.6785 3.55357 12.311 3.95011 11.9974 4.33639C11.6802 3.94929 11.3091 3.55266 10.8649 3.2079C9.92877 2.48125 8.70883 2 7 2Z" />
			)}
			{variant === "outlined" && (
				<path fill="none" stroke="currentColor" stroke-width="2" d="M1 8.4C1 4 4.5 3 6.5 3C9 3 11 5 12 6.5C13 5 15 3 17.5 3c2 0 5.5 1 5.5 5.4C23 15 12 21 12 21S1 15 1 8.4Z"/>
			)}
		</svg>
	)
})
