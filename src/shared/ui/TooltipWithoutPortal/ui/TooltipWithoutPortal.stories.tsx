import { Meta, StoryObj } from '@storybook/react'
import TooltipWithoutPortal from './TooltipWithoutPortal'
import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Typography } from '../../Typography'

const meta: Meta<typeof TooltipWithoutPortal> = {
	title: 'shared/TooltipWithoutPortal',
	component: TooltipWithoutPortal,
	args: {
		placement: 'top',
		borderRadius: 's',
	},
}

export default meta

type Story = StoryObj<typeof TooltipWithoutPortal>

const TooltipWrapper = (args: any) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<div style={{ position: 'relative' }}>
			<Button
					onMouseEnter={handleOpen}
					onMouseLeave={handleClose}
					onFocus={handleOpen}
					onBlur={handleClose}
			>
				Button
			</Button>
			<TooltipWithoutPortal open={isOpen} {...args} />
		</div>
	)
}

export const Default: Story = {
	render: (args) => TooltipWrapper(args),
	args: {
		children: <Typography color='hard' noWrap>Tooltip text</Typography>,
	},
}
