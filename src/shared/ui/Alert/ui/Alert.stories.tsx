import { Meta, StoryObj } from '@storybook/react'
import { IconButton } from '@/shared/ui/IconButton'
import { Alert } from './Alert'
import { Heart, XMark } from '@/shared/assets/icons'

const meta: Meta<typeof Alert> = {
	title: 'shared/Alert',
	component: Alert,
	args: {
		variant: 'filled',
		severity: 'info',
		borderRadius: 'm',
		fullWidth: false,
	},
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
	args: {
		children: <p>Default alert</p>,
	},
}

export const WithActions: Story = {
	args: {
		actions: (
			<IconButton variant="clear" color="inherit">
				<XMark />
			</IconButton>
		),
		children: <p>Alert with action button</p>,
	},
}

export const WithIcon: Story = {
	args: {
		icon: <Heart size="s" />,
		children: <p>Alert with icon</p>,
	},
}
