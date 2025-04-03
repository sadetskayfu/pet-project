import { Meta, StoryObj } from '@storybook/react'
import { RHFRadioGroup } from './RHFRadioGroup'
import { Button } from '@/shared/ui/Button'
import { z } from 'zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Option } from '../types/Option'

const meta: Meta<typeof RHFRadioGroup> = {
	title: 'shared/RHFControllers/RHFRadioGroup',
	component: RHFRadioGroup,
}

export default meta

type Story = StoryObj<typeof RHFRadioGroup>

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
	skills: z.string().min(1)
})

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
	skills: '',
}

const Form = () => {
	const { handleSubmit } = useFormContext<FormData>()

	const onSubmit = () => {
		alert(`Submit`)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{width: '150px'}}>
			<RHFRadioGroup<FormData>
				helperText="Select you favorite skill"
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

export const RadioForm: Story = {
	render: () => <Provider />,
}
