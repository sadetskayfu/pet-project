import { Meta, StoryObj } from '@storybook/react'
import { DateCalendar } from './DateCalendar'
import { useState } from 'react'

const meta: Meta<typeof DateCalendar> = {
	title: 'shared/DateCalendar',
	component: DateCalendar,
	args: {
		maxYear: 2050,
	},
}

export default meta

type Story = StoryObj<typeof DateCalendar>

const Wrapper = (args: any) => {
	const [value, setValue] = useState<string>('')

	return (
		<div style={{display: 'flex', flexDirection: 'column', rowGap: '10px'}}>
			<span>Selected value: {value}</span>
			<DateCalendar {...args} value={value} onChange={setValue}/>
		</div>
	)
}

export const Default: Story = {
	render: (args) => Wrapper(args)
}

