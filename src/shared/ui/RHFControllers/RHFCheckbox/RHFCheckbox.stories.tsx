import { Meta, StoryObj } from '@storybook/react'
import { RHFCheckbox } from './RHFCheckbox'
import { Button } from '@/shared/ui/Button'
import { z } from 'zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

const meta: Meta<typeof RHFCheckbox> = {
	title: 'shared/RHFControllers/RHFCheckbox',
	component: RHFCheckbox,
}

export default meta

type Story = StoryObj<typeof RHFCheckbox>

const schema = z.object({
	isAccepted: z.boolean().refine((value) => value === true),
	isLiked: z.boolean().refine((value) => value === true),
})

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
	isAccepted: false,
	isLiked: false,
}

const Form = () => {
	const {
		handleSubmit,
		formState: { isValid },
	} = useFormContext<FormData>()

	const onSubmit = () => {
		alert(`Accepted`)
	}

	return (
		<form
			style={{ width: '150px', display: 'flex', flexDirection: 'column' }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<RHFCheckbox<FormData> name="isAccepted" label="Accept" offset="left" required/>
			<RHFCheckbox<FormData> name="isLiked" aria-label="Like" offset="left" required/>
			<Button style={{ marginTop: '10px' }} disabled={!isValid} type="submit">
				Submit
			</Button>
		</form>
	)
}

const Provider = () => {
	const methods = useForm<FormData>({
		mode: 'onBlur',
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
