import { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'
import { useState } from 'react'

const meta: Meta<typeof DatePicker> = {
	title: 'shared/DatePicker ',
	component: DatePicker,
	args: {
		label: 'Date picker',
		size: 'l',
		disabled: false,
		required: false,
		readonly: false,
		style: {
			width: '300px',
		},
	},
}

export default meta

type Story = StoryObj<typeof DatePicker>

const ControlledDatePickerWrapper = (args: any) => {
	const [value, setValue] = useState<string>('')

	return (
		<DatePicker
			value={value}
			onChange={setValue}
			label="Controlled date picker"
			placeholder='Select your birth day'
			helperText='Helper text'
			{...args}
		/>
	)
}

export const Default: Story = {
	args: {
		placeholder: 'Select date',
	},
}

export const Controlled: Story = {
	render: (args) => ControlledDatePickerWrapper(args)
}
