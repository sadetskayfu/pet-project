import { Meta, StoryObj } from '@storybook/react'
import { FormGroup } from '@/shared/ui/FormGroup'
import { Radio } from './Radio'
import { ChangeEvent, useState } from 'react'
import { FormLabel } from '@/shared/ui/FormLabel'

const meta: Meta<typeof Radio> = {
	title: 'shared/Radio',
	component: Radio,
	args: {
		size: 'm',
		variant: 'filled',
	},
}

export default meta

type Story = StoryObj<typeof Radio>

const RadioGroupWrapper = (args: any) => {
	const [selectedValue, setSelectedValue] = useState<string>('1')

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value)
	}

	return (
		<>
			<FormGroup label="Radio group">
				<FormLabel
					label="First"
					control={
						<Radio
							name="radio"
							value="1"
							offset='left'
							checked={selectedValue === '1'}
							onChange={handleChange}
							{...args}
						/>
					}
				/>
				<FormLabel
					label="Second"
					control={
						<Radio
							name="radio"
							value="2"
							checked={selectedValue === '2'}
							onChange={handleChange}
							{...args}
						/>
					}
				/>
				<FormLabel
					label="Third"
					control={
						<Radio
							name="radio"
							value="3"
							checked={selectedValue === '3'}
							onChange={handleChange}
							{...args}
						/>
					}
				/>
			</FormGroup>
		</>
	)
}

export const Default: Story = {
	render: (args) => RadioGroupWrapper(args),
}
