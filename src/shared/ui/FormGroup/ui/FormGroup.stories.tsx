import { Meta, StoryObj } from '@storybook/react'
import { FormGroup } from './FormGroup'
import { useState } from 'react'
import { FormLabel } from '@/shared/ui/FormLabel'
import { Checkbox } from '@/shared/ui/Checkbox'

const meta: Meta<typeof FormGroup> = {
	title: 'shared/FormGroup',
	component: FormGroup,
	args: {
		orientation: 'horizontal',
		label: 'Checkbox group',
		hiddenLabel: false,
		required: false,
		disabled: false,
	},
}

export default meta

type Story = StoryObj<typeof FormGroup>

const FormGroupWrapper = (args: any) => {
	const [state, setState] = useState({
		first: false,
		second: false,
		third: false,
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.target.name]: event.target.checked,
		})
	}

	const { first, second, third } = state
	const error = [first, second, third].filter((v) => v).length !== 2

	return (
		<>
			<FormGroup errored={error} helperText={error ? 'Pick minimum two' : 'Helper text'} {...args}>
				<FormLabel
					label="First"
					control={
						<Checkbox
							offset='left'
							name="first"
							checked={state.first}
							onChange={handleChange}
						/>
					}
				/>
				<FormLabel
					label="Second"
					control={
						<Checkbox
							offset={args.orientation === 'vertical' ? 'left' : undefined}
							name="second"
							checked={state.second}
							onChange={handleChange}
						/>
					}
				/>
				<FormLabel
					label="Third"
					control={
						<Checkbox
							offset={args.orientation === 'vertical' ? 'left' : undefined}
							name="third"
							checked={state.third}
							onChange={handleChange}
						/>
					}
				/>
			</FormGroup>
		</>
	)
}

export const Default: Story = {
	render: (args) => FormGroupWrapper(args),
}
