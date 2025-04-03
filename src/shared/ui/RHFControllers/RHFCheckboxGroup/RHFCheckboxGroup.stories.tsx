import { Meta, StoryObj } from '@storybook/react'
import { RHFCheckboxGroup } from './RHFCheckboxGroup'
import { Button } from '@/shared/ui/Button'
import { z } from 'zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Option } from '../types/Option'

const meta: Meta<typeof RHFCheckboxGroup> = {
	title: 'shared/RHFControllers/RHFCheckboxGroup',
	component: RHFCheckboxGroup,
}

export default meta

type Story = StoryObj<typeof RHFCheckboxGroup>

const options: Option[] = [
	{
		value: '1',
		label: 'Redux',
	},
	{
		value: '2',
		label: 'React',
	},
	{
		value: '3',
		label: 'Storybook',
	},
	{
		value: '4',
		label: 'Redis',
	},
]

const schema = z.object({
	skills: z.array(z.string()).min(2).max(3),
})

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
	skills: [],
}

const Form = () => {
	const { handleSubmit } = useFormContext<FormData>()

	const onSubmit = () => {
		alert(`Submit`)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{width: '150px'}}>
			<RHFCheckboxGroup<FormData>
				helperText="Pick your skills"
				name="skills"
				label="Skills"
                orientation='vertical'
				options={options}
                getDisabledOptions={(_, index) => index === 3}
                required
			/>
			<Button style={{ marginTop: '10px' }} type="submit">
				Submit
			</Button>
		</form>
	)
}

const Provider = () => {
	const methods = useForm<FormData>({
		mode: 'onSubmit',
		resolver: zodResolver(schema),
		defaultValues,
	})
	return (
		<FormProvider {...methods}>
			<Form />
			<DevTool control={methods.control} />
		</FormProvider>
	)
}

export const CheckboxForm: Story = {
	render: () => <Provider />,
}
