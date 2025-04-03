import { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
	title: 'shared/Avatar',
	component: Avatar,
	args: {
		size: undefined,
		borderRadius: 'circular',
		border: 'none',
		defaultBgColor: true,
	},
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
}

export const WithErroredUrl: Story = {
	args: {
		src: 'errored-url',
		alt: 'Cats',
	},
}

export const WitchImg: Story = {
	args: {
		src: 'https://stihi.ru/pics/2014/04/21/1633.jpg',
		alt: 'Cats',
	},
}
