import { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './Dialog'
import { DialogTrigger } from './DialogTrigger'
import { Button } from '@/shared/ui/Button'
import { DialogContent } from './DialogContent'
import { DialogHeading } from './DialogHeading'
import { Typography } from '@/shared/ui/Typography'
import { DialogDescription } from './DialogDescription'
import { DialogClose } from './DialogClose'
import { IconButton } from '@/shared/ui/IconButton'
import { XMark } from '@/shared/assets/icons'

const meta: Meta<typeof Dialog> = {
	title: 'shared/Dialog',
	component: Dialog,
	args: {
		initialOpen: false,
		returnFocus: true,
	},
}

export default meta

type Story = StoryObj<typeof Dialog>

const DialogWrapper = (args: any) => {
	return (
		<div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
			<Dialog {...args}>
				<DialogTrigger>
					<Button size="m">Dialog trigger</Button>
				</DialogTrigger>
				<DialogContent
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						rowGap: '5px',
						padding: '10px',
					}}
				>
					<DialogHeading>
						<Typography component="h2" size='h5' color="primary">
							Dialog heading
						</Typography>
					</DialogHeading>
					<DialogDescription>
						<Typography component="p" size='helper' color="soft">
							Dialog description
						</Typography>
					</DialogDescription>
					<Button size="xs">Button</Button>
					<DialogClose>
						<IconButton
							aria-label="Close modal"
							color="red"
							size="xs"
							borderRadius="m"
						>
							<XMark />
						</IconButton>
					</DialogClose>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export const Default: Story = {
	render: (args) => DialogWrapper(args),
}
