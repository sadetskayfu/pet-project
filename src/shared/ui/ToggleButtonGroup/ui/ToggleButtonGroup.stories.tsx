import { Meta, StoryObj } from '@storybook/react'
import { ToggleButtonGroup } from './ToggleButtonGroup'
import { useCallback, useState } from 'react'
import { ToggleButton } from '@/shared/ui/ToggleButton/ui/ToggleButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip'
import { DelayGroup } from '../../DelayGroup'
import { Typography } from '../../Typography'

const meta: Meta<typeof ToggleButtonGroup> = {
	title: 'shared/ToggleButtonGroup',
	component: ToggleButtonGroup,
	args: {
		orientation: 'horizontal',
		disabled: false,
		errored: false,
		required: false,
		stack: true,
		hiddenLabel: false,
	},
}

export default meta

type Story = StoryObj<typeof ToggleButtonGroup>

const ToggleButtonGroupSingleSelectWrapper = (args: any) => {
	const [selectedValue, setSelectedValue] = useState<string>('')

	const handleChange = useCallback((value: string | string[]) => {
		setSelectedValue(value as string)
	}, [])

	return (
		<ToggleButtonGroup
			value={selectedValue}
			onChange={handleChange}
			label="Single button group"
			{...args}
		>
			<ToggleButton value="1">First button</ToggleButton>
			<ToggleButton value="2">Second button</ToggleButton>
			<ToggleButton value="3">Third button</ToggleButton>
		</ToggleButtonGroup>
	)
}

const ToggleButtonGroupMultiSelectWrapper = (args: any) => {
	const [selectedValues, setSelectedValues] = useState<string[]>([])

	const handleChange = useCallback((value: string | string[]) => {
		setSelectedValues(value as string[])
	}, [])

	return (
		<ToggleButtonGroup
			value={selectedValues}
			onChange={handleChange}
			label="Multi button group"
			{...args}
		>
			<DelayGroup delay={500}>
				<Tooltip>
					<TooltipTrigger>
						<ToggleButton aria-label="First button" value="1">
							1
						</ToggleButton>
					</TooltipTrigger>
					<TooltipContent>
						<Typography color='hard' size="helper">First button</Typography>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<ToggleButton aria-label="Second button" value="2">
							2
						</ToggleButton>
					</TooltipTrigger>
					<TooltipContent>
						<Typography color='hard' size="helper">First button</Typography>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<ToggleButton disabled aria-label="Three button" value="3">
							3
						</ToggleButton>
					</TooltipTrigger>
					<TooltipContent>
						<Typography color='hard' size="helper">First button</Typography>
					</TooltipContent>
				</Tooltip>
			</DelayGroup>
		</ToggleButtonGroup>
	)
}

export const ToggleButtonGroupSingleSelect: Story = {
	render: (args) => ToggleButtonGroupSingleSelectWrapper(args),
	args: {
		helperText: 'Helper text',
	},
}

export const ToggleButtonGroupMultiSelect: Story = {
	render: (args) => ToggleButtonGroupMultiSelectWrapper(args),
}
