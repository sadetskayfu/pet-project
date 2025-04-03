import { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { Heart } from '@/shared/assets/icons'

const meta: Meta<typeof Checkbox> = {
	title: 'shared/Checkbox',
	component: Checkbox,
	args: {
		size: 'm',
		color: 'primary',
		variant: 'filled',
		disabled: false,
	},
}

export default meta

type Story = StoryObj<typeof Checkbox>


export const Default: Story = {
}

export const WithCustomIcon: Story = {
	args: {
		icon: <Heart />,
		checkedIcon: <Heart />,
		color: 'red',
	},
}
