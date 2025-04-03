import { Meta, StoryObj } from '@storybook/react'
import { ConfirmationDeleteDialog } from './ConfirmationDeleteDialog'
import { useRef, useState } from 'react'
import { Button } from '@/shared/ui/Button'

const meta: Meta<typeof ConfirmationDeleteDialog> = {
	title: 'widgets/ConfirmationDeleteDialog',
	component: ConfirmationDeleteDialog,
	args: {},
}

export default meta

type Story = StoryObj<typeof ConfirmationDeleteDialog>

const Wrapper = (args: any) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const buttonRef = useRef<HTMLButtonElement>(null)

	const handleDelete = () => {
		alert('Deleted')
	}

	return (
		<>
			<Button ref={buttonRef} size="s" onClick={() => setIsOpen(true)}>
				Delete
			</Button>
			<ConfirmationDeleteDialog
				open={isOpen}
				setOpen={setIsOpen}
				onDelete={handleDelete}
				returnFocus={buttonRef}
				{...args}
			/>
		</>
	)
}

export const Default: Story = {
	render: (args) => Wrapper(args),
	args: {
		title: 'Are you sure want to delete?',
		description: 'Description'
	},
}
