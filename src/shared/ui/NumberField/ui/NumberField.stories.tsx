import { Meta, StoryObj } from '@storybook/react'
import { NumberField } from './NumberField'

const meta: Meta<typeof NumberField> = {
	title: 'shared/NumberField',
	component: NumberField,
	args: {
        min: undefined,
        max: undefined,
        step: 1,
	},
}

export default meta

type Story = StoryObj<typeof NumberField>

export const Default: Story = {
    args: {
        label: 'Number field'
    }
}

