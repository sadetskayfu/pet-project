import { classNames } from "@/shared/helpers/classNames/classNames"
import { IconProps } from "../types/IconProps"
import { memo } from "react"
import styles from "../styles/style.module.scss"

type VolumeVariant = "low" | "full" | "mute"

interface VolumeProps extends IconProps {
	variant?: VolumeVariant
}

export const Volume = memo((props: VolumeProps) => {
	const {
		className,
		color = "inherit",
		size = "inherit",
		variant = "low",
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
			{variant === "low" && (
				<path d="M4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5" />
			)}
			{variant === "full" && (
				<>
					<path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19z" />
					<path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5M4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2" />
				</>
			)}
			{variant === "mute" && (
				<path d="m7.727 6.313l-4.02-4.02l-1.414 1.414l18 18l1.414-1.414l-2.02-2.02A9.578 9.578 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.13 8.13 0 0 1-1.671 4.914l-1.286-1.286C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V2.132zM4 17h2.697L14 21.868v-3.747L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2" />
			)}
		</svg>
	)
})
