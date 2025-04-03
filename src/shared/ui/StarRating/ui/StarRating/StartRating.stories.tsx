import { Meta, StoryObj } from '@storybook/react'
import { StarRating } from './StarRating'
import { useState } from 'react'
import { Composite, CompositeItem } from '@floating-ui/react'
import { Button } from '@/shared/ui/Button'

const meta: Meta<typeof StarRating> = {
	title: 'shared/StarRating',
	component: StarRating,
	args: {
		label: 'Star rating',
		disabled: false,
		readOnly: false,
		required: false,
		maxStars: 5,
		hiddenLabel: true,
		name: 'star-rating',
		precise: false,
		size: 'm',
	},
}

export default meta

type Story = StoryObj<typeof StarRating>

const StarRatingWrapper = (args: any) => {
	const [value, setValue] = useState<number>(0)

	return (
		<div>
			<div>Asd</div>
			<StarRating value={value} onChange={setValue} {...args} />
		</div>
	)
}

const ControlledHoverValueWrapper = (args: any) => {
	const [value, setValue] = useState<number>(0)
	const [hoverValue, setHoverValue] = useState<number>(value)

	return (
		<div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
			
			<StarRating
				value={value}
				hoverValue={hoverValue}
				onChange={setValue}
				onChangeHoverValue={setHoverValue}
				{...args}
			/>
			<span>Stars: {hoverValue}</span>
		</div>
	)
}

const Wrapper = () => {
	return (
		<Composite cols={3} style={{display: 'grid', gridTemplateColumns: '33% 33% 33%'}}>
			<div>
			<CompositeItem render={<Button>Button 1</Button>}/>
			</div>
			<CompositeItem render={<Button>Button 2</Button>}/>
			<CompositeItem render={<Button disabled>Button 3</Button>}/>
			<CompositeItem render={<Button>Button 1</Button>}/>
			<CompositeItem render={<Button>Button 2</Button>}/>
			<CompositeItem render={<Button>Button 3</Button>}/>
			<CompositeItem render={<Button>Button 1</Button>}/>
			<CompositeItem render={<Button>Button 2</Button>}/>
			<CompositeItem render={<Button>Button 3</Button>}/>
		</Composite>
	)
}

export const Default: Story = {
	render: (args) => StarRatingWrapper(args),
}

export const ControlledHoverValue: Story = {
	render: (args) => ControlledHoverValueWrapper(args),
}

export const Composited: Story = {
	render: () => Wrapper()
}
