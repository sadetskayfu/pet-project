import { memo } from "react"
import { AdditionalClasses, classNames, Mods } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

export interface SectionTitleProps {
	className?: string
	id?: string
	label: string
	component?: "h1" | "h2"
	size?: 'l' | 'm'
	centering?: boolean
}

export const SectionTitle = memo((props: SectionTitleProps) => {
	const { className, id, label, component = "h2", size = 'm', centering } = props

	const Tag = component

	const mods: Mods = {
		[styles['centering']]: centering
	}

	const additionalClasses: AdditionalClasses = [
		className,
		styles[`size-${size}`]
	]

	return (
		<Tag id={id} className={classNames(styles["section-title"], additionalClasses, mods)}>
			{label}
		</Tag>
	)
})
