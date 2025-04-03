import { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'
import { FormLabel } from '@/shared/ui/FormLabel'

const meta: Meta<typeof Switch> = {
	title: 'shared/Switch',
	component: Switch,
	args: {
		size: 'm',
		disabled: false,
		required: false,
	},
}

export default meta

type Story = StoryObj<typeof Switch>

const SwitchWithLabelWrapper = (args: any) => {
	return (
		<>
			<FormLabel
				label="Label"
				disabled={args.disabled}
				required={args.required}
				control={<Switch {...args} />}
			/>
		</>
	)
}

export const Default: Story = {
	args: {
		"aria-label": 'Default switch'
	}
}

export const WithLabel: Story = {
	render: (args) => SwitchWithLabelWrapper(args),
}
