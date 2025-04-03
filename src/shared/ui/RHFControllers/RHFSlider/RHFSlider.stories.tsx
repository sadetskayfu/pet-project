import { Meta, StoryObj } from '@storybook/react'
import { RHFSlider } from './RHFSlider'
import { Button } from '@/shared/ui/Button'
import { z } from 'zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SliderMarker } from '../../Slider'

const meta: Meta<typeof RHFSlider> = {
	title: 'shared/RHFControllers/RHFSlider',
	component: RHFSlider,
}

export default meta

type Story = StoryObj<typeof RHFSlider>

const schema = z.object({
	age: z.number(),
	exp: z.number(),
	price: z.array(z.number()),
})

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
	age: 1,
	exp: 1,
	price: [0, 100000],
}

const Form = () => {
	const { handleSubmit } = useFormContext<FormData>()

	const priceMarkers: SliderMarker[] = [
		{
			value: 0,
			label: '0$',
		},
		{
			value: 100000,
			label: '100k$',
		},
	]

	const onSubmit = (data: FormData) => {
		alert(
			`age: ${data.age}, min price: ${data.price[0]}, max price: ${data.price[1]}, exp:${data.exp}`
		)
	}

	return (
		<form
			style={{ width: '300px', display: 'flex', flexDirection: 'column', rowGap: '20px' }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<RHFSlider<FormData> name="age" size="s" min={1} max={100} aria-label='Age'/>
			<RHFSlider<FormData>
				name="exp"
				size="s"
				min={1}
				max={5}
				markers
				visibleMarkersLabel
                aria-label='Experience'
			/>
			<RHFSlider<FormData>
				name="price"
				size="s"
				min={0}
				max={100000}
				step={1000}
				getTooltipLabel={(value) => `${value}$`}
				customMarkers={priceMarkers}
				markers
				visibleMarkersLabel
                aria-label='Price'
			/>

			<Button type="submit">
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

export const SliderForm: Story = {
	render: () => <Provider />,

}