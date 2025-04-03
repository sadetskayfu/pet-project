import { Meta, StoryObj } from '@storybook/react'
import { FormLabel } from './FormLabel'
import { Checkbox } from '@/shared/ui/Checkbox'

const meta: Meta<typeof FormLabel> = {
	title: 'shared/FormLabel',
	component: FormLabel,
	args: {
		disabled: false,
		required: false,
		labelPlacement: 'right',
		label: 'I am label'
	},
}

export default meta

type Story = StoryObj<typeof FormLabel>

const FormLabelWrapper = (args: any) => {
	return (
		<>
			<FormLabel {...args} control={<Checkbox />}/>
		</>
	)
}

export const Default: Story = {
	render: (args) => FormLabelWrapper(args),
}
