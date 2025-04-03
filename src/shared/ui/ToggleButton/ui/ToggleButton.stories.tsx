import { Meta, StoryObj } from '@storybook/react'
import { ToggleButton } from './ToggleButton'
import { useState } from 'react'
import { Gear } from '@/shared/assets/icons'
import { ToggleButtonGroup } from '../../ToggleButtonGroup'

const meta: Meta<typeof ToggleButton> = {
	title: 'shared/ToggleButton',
	component: ToggleButton,
	args: {
		size: 's',
		color: 'secondary',
		disabled: false,
	},
}

export default meta

type Story = StoryObj<typeof ToggleButton>

const ToggleButtonWrapper = (args: any) => {
	const [selectedValue, setSelectedValue] = useState<string>('')

	const handleChange = (value: string | string[]) => {
		setSelectedValue(value as string)
	}

	return (
		<ToggleButtonGroup hiddenLabel label='Toggle button group' value={selectedValue} onChange={handleChange}>
			<ToggleButton
				value="1"
				{...args}
			>
				<Gear />
			</ToggleButton>
			<ToggleButton
				value="2"
				{...args}
			>
				<Gear />
			</ToggleButton>
		</ToggleButtonGroup>
	)
}

export const DefaultToggleButton: Story = {
	render: (args) => ToggleButtonWrapper(args),
}
