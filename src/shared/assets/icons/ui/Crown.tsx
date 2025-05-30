import { classNames } from "@/shared/helpers/classNames/classNames"
import { IconProps } from "../types/IconProps"
import { memo } from "react"
import styles from "../styles/style.module.scss"

export const Crown = memo((props: IconProps) => {
	const { className, color = "inherit", size = "inherit" } = props

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[color],
		styles[size],
	]

	return (
		<svg
			className={classNames(styles["icon"], additionalClasses)}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
		>
			<g fill="none">
				<path
					fill="#00A6ED"
					fill-rule="evenodd"
					d="M6.94 23.5a1.58 1.58 0 1 1-3.16 0a1.58 1.58 0 0 1 3.16 0m21.26 0a1.58 1.58 0 1 1-3.16 0a1.58 1.58 0 0 1 3.16 0"
					clip-rule="evenodd"
				/>
				<path
					fill="#E19747"
					fill-rule="evenodd"
					d="m10.25 13.27l3.18 4.27l-6.59.76l2.12-4.89c-.51-.2-.87-.7-.87-1.28c0-.76.62-1.38 1.38-1.38a1.383 1.383 0 0 1 .78 2.52m12.76.14l2.12 4.89l-6.59-.76l3.18-4.27c-.36-.25-.6-.67-.6-1.14c0-.76.62-1.38 1.38-1.38c.76 0 1.38.62 1.38 1.38c0 .58-.36 1.08-.87 1.28"
					clip-rule="evenodd"
				/>
				<path
					fill="#FFB02E"
					d="M29.98 13.09c0-.76-.62-1.38-1.38-1.38c-.76 0-1.38.62-1.38 1.38c0 .28.09.55.23.76c-.22 0-.44.05-.65.19l-3.93 2.54c-.52.33-1.2.21-1.57-.29l-4.37-5.93a.689.689 0 0 0-.11-.13a1.721 1.721 0 1 0-1.66 0c-.04.04-.08.08-.11.13l-4.37 5.93c-.36.5-1.05.62-1.57.29l-3.93-2.54c-.21-.14-.43-.19-.65-.19c.15-.22.23-.48.23-.76c0-.76-.62-1.38-1.38-1.38c-.76 0-1.38.62-1.38 1.38c0 .76.62 1.38 1.38 1.38c.05 0 .1 0 .14-.01c-.13.23-.18.5-.12.79L6 28.22c.19.93 1.01 1.6 1.96 1.6h16.06c.95 0 1.77-.67 1.96-1.6l2.6-12.97c.06-.29 0-.57-.12-.79c.05 0 .1.01.14.01c.76 0 1.38-.62 1.38-1.38"
				/>
				<path fill="#00A6ED" d="M15.99 26a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5" />
				<path
					fill="#F8312F"
					fill-rule="evenodd"
					d="M11 23.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m13 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
					clip-rule="evenodd"
				/>
			</g>
		</svg>
	)
})
