import { memo, ReactNode } from "react"
import {
	AdditionalClasses,
	classNames,
	Mods,
} from "@/shared/helpers/classNames"
import { ToggleButtonGroupContext } from "../model/ToggleButtonGroupContext"
import styles from "./style.module.scss"

type ToggleButtonOrientation = "horizontal" | "vertical"

type AriaAttributes = {
	"aria-label"?: string
	"aria-labelledby"?: string
}

export interface ToggleButtonGroupProps extends AriaAttributes {
	className?: string
	children: ReactNode
	value: string | string[]
	orientation?: ToggleButtonOrientation
	disabled?: boolean
	stack?: boolean
	onChange: (value: string) => void
}

export const ToggleButtonGroup = memo((props: ToggleButtonGroupProps) => {
	const {
		className,
		children,
		value: selectedValue,
		orientation = "horizontal",
		disabled,
		stack = true,
		onChange,
		...otherProps
	} = props

	const additionalClasses: AdditionalClasses = [className, styles[orientation]]

	const mods: Mods = {
		[styles["stack"]]: stack,
	}

	return (
		<div
			className={classNames(
				styles["toggle-button-group"],
				additionalClasses,
				mods
			)}
			aria-disabled={disabled ? "true" : undefined}
			role="group"
			{...otherProps}
		>
			<ToggleButtonGroupContext.Provider
				value={{ selectedValue, onChange, disabled }}
			>
				{children}
			</ToggleButtonGroupContext.Provider>
		</div>
	)
})
