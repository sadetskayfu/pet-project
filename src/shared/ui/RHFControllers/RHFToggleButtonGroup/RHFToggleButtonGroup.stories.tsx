import { Meta, StoryObj } from '@storybook/react'
import { RHFToggleButtonGroup } from './RHFToggleButtonGroup'
import { Button } from '@/shared/ui/Button'
import { z } from 'zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Option } from '../types/Option'

const meta: Meta<typeof RHFToggleButtonGroup> = {
	title: 'shared/RHFControllers/RHFToggleButtonGroup',
	component: RHFToggleButtonGroup,
}

export default meta

type Story = StoryObj<typeof RHFToggleButtonGroup>

const skills: Option[] = [
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

const ages: Option[] = [
	{
		value: '15',
		label: '15',
	},
	{
		value: '20',
		label: '20',
	},
]

const favoriteMovies: Option[] = [
	{
		value: 'movie1',
		label: 'movie 1',
	},
	{
		value: 'movie2',
		label: 'movie 2',
	},
]

const schema = z.object({
	skills: z.array(z.string()).min(2),
	ages: z.string().min(1),
	favoriteMovies: z.array(z.string()),
})

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
	skills: [],
	ages: '',
	favoriteMovies: [],
}

const Form = () => {
	const { handleSubmit } = useFormContext<FormData>()

	const onSubmit = () => {
		alert(`Submit`)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}
		>
			<RHFToggleButtonGroup<FormData>
				name="skills"
				orientation="horizontal"
				options={skills}
				getDisabledOptions={(_, index) => index === 3}
				label="Skills"
				required
			/>
			<RHFToggleButtonGroup<FormData>
				name="ages"
				orientation="horizontal"
				options={ages}
				label="Ages"
				required
			/>
			<RHFToggleButtonGroup<FormData>
				name="favoriteMovies"
				orientation="horizontal"
				options={favoriteMovies}
				label="Favorite movies"
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

export const ToggleButtonGroupForm: Story = {
	render: () => <Provider />,
}
