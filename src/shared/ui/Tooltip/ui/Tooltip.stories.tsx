import { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '@/shared/ui/Button'
import { TooltipTrigger } from './TooltipTrigger'
import { TooltipContent } from './TooltipContent'
import { useState } from 'react'
import { DelayGroup } from '../../DelayGroup'

const meta: Meta<typeof Tooltip> = {
	title: 'shared/Tooltip',
	component: Tooltip,
	args: {
		placement: 'top',
		borderRadius: 's',
		followCursor: false,
		disabledClick: true,
		disabledFocus: false,
		disabledHover: false,
		disabledTouch: false,
		describeChild: false,
		interactive: false,
		offset: 12,
		flipPadding: 5,
		arrowPadding: 10,
	},
}

export default meta

type Story = StoryObj<typeof Tooltip>

const TooltipWrapper = (args: any) => {
	return (
		<Tooltip {...args}>
			<TooltipTrigger>
				<Button>Tooltip trigger</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Tooltip content message</p>
			</TooltipContent>
		</Tooltip>
	)
}

const ControlledTooltipWrapper = (args: any) => {
	const [isFocusedInput, setIsFocusedInput] = useState<boolean>(false)

	return (
		<Tooltip open={isFocusedInput} {...args}>
			<TooltipTrigger>
				<input
					onFocus={() => setIsFocusedInput(true)}
					onBlur={() => setIsFocusedInput(false)}
					placeholder="Focus me.."
				/>
			</TooltipTrigger>
			<TooltipContent>
				<p>Controlled tooltip.</p>
			</TooltipContent>
		</Tooltip>
	)
}

const DelayGroupWrapper = (args: any) => {
	return (
		<div style={{display: 'flex', columnGap: '5px'}}>
			<DelayGroup delay={500}>
				<Tooltip {...args}>
					<TooltipTrigger>
						<Button>Button 1</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Tooltip content message</p>
					</TooltipContent>
				</Tooltip>
				<Tooltip {...args}>
					<TooltipTrigger>
						<Button>Button 2</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Tooltip content message</p>
					</TooltipContent>
				</Tooltip>
				<Tooltip {...args}>
					<TooltipTrigger>
						<Button>Button 3</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Tooltip content message</p>
					</TooltipContent>
				</Tooltip>
			</DelayGroup>
		</div>
	)
}

export const Default: Story = {
	render: (args) => TooltipWrapper(args),
}

export const Interactive: Story = {
	render: (args) => TooltipWrapper(args),
	args: {
		interactive: true,
	},
}

export const OpenOnClick: Story = {
	render: (args) => TooltipWrapper(args),
	args: {
		disabledClick: false,
		disabledTouch: true,
		disabledHover: true,
		disabledFocus: true,
	},
}

export const Controlled: Story = {
	render: (args) => ControlledTooltipWrapper(args),
}

export const FollowCursor: Story = {
	render: (args) => TooltipWrapper(args),
	args: {
		followCursor: true,
	},
}

export const TooltipsInDelayGroup: Story = {
	render: (args) => DelayGroupWrapper(args),
	args: {},
}
