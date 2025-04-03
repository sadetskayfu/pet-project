import { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'

const meta: Meta<typeof Typography> = {
	title: 'shared/Typography',
	component: Typography,
	args: {
		component: 'p',
		color: 'soft',
		size: 'default',
		textAlign: 'start',
		noWrap: false,
		overflowWrap: 'anywhere',
		fontWeight: 'normal',
	},
}

export default meta

type Story = StoryObj<typeof Typography>

const Wrapper = (args: any) => {
	return (
		<div style={{ width: '100px', backgroundColor: 'black' }}>
			<Typography {...args} />
		</div>
	)
}

export const Default: Story = {
	render: (args) => Wrapper(args),
	args: {
		children:
			'Природа — это удивительный мир, полный загадок и красоты. Каждый элемент в ней, от величественных гор до крошечных цветков, играет свою уникальную роль в экосистеме. Леса, поля, реки и океаны — все они являются домом для множества живых существ, которые взаимодействуют друг с другом, создавая гармонию',
	},
}
