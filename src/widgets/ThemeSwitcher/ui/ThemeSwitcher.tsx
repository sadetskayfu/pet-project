import { useTheme } from '@/app/providers/theme'
import { memo } from 'react'
import { Theme } from '@/app/providers/theme'
import { Moon, Sun } from '@/shared/assets/icons'
import { ToggleButtonGroup } from '@/shared/ui/ToggleButtonGroup'
import { ToggleButton } from '@/shared/ui/ToggleButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip'
import { Typography } from '@/shared/ui/Typography'
import { DelayGroup } from '@/shared/ui/DelayGroup'

interface ThemeSwitcherProps {
	className?: string
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
	const { className } = props

	const { theme, toggleTheme } = useTheme()

	const sunLabel = theme === Theme.LIGHT ? 'Current color scheme - light' : 'Switch color scheme to light'
	const moonLabel = theme === Theme.DARK ? 'Current color scheme - dark' : 'Switch color scheme to dark'

	return (
		<ToggleButtonGroup className={className} hiddenLabel label="Color theme switch" required value={theme} onChange={(value) => toggleTheme(value as Theme)}>
			<DelayGroup delay={200}>
				<Tooltip>
					<TooltipTrigger>
						<ToggleButton
							aria-label={sunLabel}
							size="s"
							value={Theme.LIGHT}
						>
							<Sun />
						</ToggleButton>
					</TooltipTrigger>
					<TooltipContent>
						<Typography size="helper" color="hard">
							{sunLabel}
						</Typography>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<ToggleButton
							aria-label={moonLabel}
							size="s"
							value={Theme.DARK}
						>
							<Moon />
						</ToggleButton>
					</TooltipTrigger>
					<TooltipContent>
						<Typography size="helper" color="hard">
							{moonLabel}
						</Typography>
					</TooltipContent>
				</Tooltip>
			</DelayGroup>
		</ToggleButtonGroup>
	)
})
