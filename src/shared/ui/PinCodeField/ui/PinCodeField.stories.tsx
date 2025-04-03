import { Meta, StoryObj } from '@storybook/react'
import { PinCodeField } from './PinCodeField'
import { useState } from 'react'

const meta: Meta<typeof PinCodeField> = {
	title: 'shared/PinCodeField',
	component: PinCodeField,
	args: {
		required: false,
		disabled: false,
		hiddenLabel: false,
		orientation: 'horizontal',
		label: 'Pin code field',
		errored: false,
		helperText: 'Helper text',
	},
}

export default meta

type Story = StoryObj<typeof PinCodeField>

const PinCodeFieldWrapper = (args: any) => {
	const [value, setValue] = useState<string[]>(['', '', '', '', '', ''])

	return <PinCodeField value={value} onChange={setValue} {...args} />
}

export const Default: Story = {
	render: (args) => PinCodeFieldWrapper(args),
}
