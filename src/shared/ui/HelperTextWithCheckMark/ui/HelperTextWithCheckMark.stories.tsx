import { Meta, StoryObj } from '@storybook/react'
import { HelperTextWithCheckMark } from './HelperTextWithCheckMark'

const meta: Meta<typeof HelperTextWithCheckMark> = {
	title: 'shared/HelperTextWithCheckMark',
	component: HelperTextWithCheckMark,
	args: {
        valid: false,
        label: 'Helper text with checkmark'
	},
}

export default meta

type Story = StoryObj<typeof HelperTextWithCheckMark>


export const Default: Story = {
	
}
