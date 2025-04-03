import { classNames } from "@/shared/helpers/classNames/classNames"
import { IconProps } from "../../types/IconProps"
import { memo } from "react"
import styles from "../../styles/style.module.scss"
import seekStyles from "./styles.module.scss"

type SeekDirection = "left" | "right"

interface SeekProps extends IconProps {
	direction?: SeekDirection
}

export const Rewind = memo((props: SeekProps) => {
	const {
		className,
		color = "inherit",
		size = "inherit",
		direction = "left",
	} = props

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[color],
		styles[size],
		seekStyles[direction],
	]

	return (
		<svg
			className={classNames(styles["icon"], additionalClasses)}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M12 12V7l-7 5l7 5zm7-5l-7 5l7 5z" />
		</svg>
	)
})


