import { useTheme } from "@/app/providers/theme"
import { memo } from "react"
import { Theme } from "@/app/providers/theme"
import { Moon, Sun } from "@/shared/assets/icons"
import { ToggleButtonGroup } from "@/shared/ui/ToggleButtonGroup"
import { ToggleButton } from "@/shared/ui/ToggleButton"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { DelayGroup } from "@/shared/ui/DelayGroup"

interface ThemeSwitcherProps {
	className?: string
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
	const { className } = props

	const { theme, toggleTheme } = useTheme()

	const sunLabel =
		theme === Theme.LIGHT ? "Текущая тема: светлая" : "Сменить тему на светлую"
	const moonLabel =
		theme === Theme.DARK ? "Текущая тема: темная" : "Сменить тему на темную"

	return (
		<ToggleButtonGroup
			className={className}
			aria-label="Переключатель цветовой схемы"
			value={theme}
			onChange={(value) => toggleTheme(value as Theme)}
		>
			<DelayGroup>
				<BaseTooltip label={sunLabel}>
					<ToggleButton aria-label={sunLabel} size="s" value={Theme.LIGHT}>
						<Sun />
					</ToggleButton>
				</BaseTooltip>
				<BaseTooltip label={moonLabel}>
					<ToggleButton aria-label={moonLabel} size="s" value={Theme.DARK}>
						<Moon />
					</ToggleButton>
				</BaseTooltip>
			</DelayGroup>
		</ToggleButtonGroup>
	)
})
