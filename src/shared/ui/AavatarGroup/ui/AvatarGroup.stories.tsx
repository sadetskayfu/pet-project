import { Meta, StoryObj } from '@storybook/react'
import { AvatarGroup } from './AvatarGroup'
import { Avatar } from '@/shared/ui/Avatar'
import { Badge } from '@/shared/ui/Badge'

const meta: Meta<typeof AvatarGroup> = {
	title: 'shared/AvatarGroup',
	component: AvatarGroup,
	args: {
		spacing: 'm',
		orientation: 'vertical',
		children: [
			<Avatar size='s' border="dark" />,
			<Avatar size='s' border="dark" />,
			<Avatar size='s' border="dark" />,
			<Avatar size='s' border="dark" />,
			<Badge visible size="s" position="bottom-right" color="green" border>
				<Avatar size='s' border="dark" />
			</Badge>,
			<Avatar size='s' border="dark" />,
		],
	},
}

export default meta

type Story = StoryObj<typeof AvatarGroup>

export const Default: Story = {}

export const WithMaxAvatars: Story = {
	args: {
		maxAvatars: 4,
	},
}
