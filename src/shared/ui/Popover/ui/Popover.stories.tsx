import { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'
import { PopoverTrigger } from './PopoverTrigger'
import { Button } from '../../Button'
import { PopoverContent } from './PopoverContent'
import { PopoverHeading } from './PopoverHeading'
import { Typography } from '../../Typography'
import { PopoverDescription } from './PopoverDescription'
import { PopoverClose } from './PopoverClose'

const meta: Meta<typeof Popover> = {
	title: 'shared/Popover',
	component: Popover,
	args: {
		placement: 'bottom',
		offset: 5,
		flipPadding: 5,
		arrowPadding: 10,
		modal: false,
		returnFocus: true,
		arrow: false,
	},
}

export default meta

type Story = StoryObj<typeof Popover>

const PopoverWrapper = (args: any) => {
	return (
		<div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
			<Popover {...args}>
				<PopoverTrigger>
					<Button size="m">Popover trigger</Button>
				</PopoverTrigger>
				<PopoverContent
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						rowGap: '5px',
						padding: '10px',
					}}
				>
					<PopoverHeading>
						<Typography component="h2" size="h4" color="primary">
							Popover heading
						</Typography>
					</PopoverHeading>
					<PopoverDescription>
						<Typography component="p" size="default" color="soft">
							Popover description
						</Typography>
					</PopoverDescription>
					<Button size="s">Button</Button>
					<PopoverClose>
						<Button size="s">
							Popover close
						</Button>
					</PopoverClose>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export const Default: Story = {
	render: (args) => PopoverWrapper(args),
}
